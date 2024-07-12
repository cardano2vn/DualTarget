"use client";

import {
    Data,
    Lucid,
    TxHash,
    TxSigned,
    UTxO,
    Credential,
    Lovelace,
    Address,
    Constr,
} from "lucid-cardano";
import React, { ReactNode, useContext, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { ClaimableUTxO, CalculateSellingStrategy } from "~/types/GenericsType";
import { DualtargetDatum } from "~/constants/datum";
import readDatum from "~/utils/read-datum";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import { DECIMAL_PLACES, OUTPUT_ADA } from "~/constants";
import NetworkContext from "../components/NetworkContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import { getCurrentPrice } from "~/utils/current-price";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { refresh } = useContext<WalletContextType>(WalletContext);
    const { enviroment } = useContext<NetworkContextType>(NetworkContext);
    const [txHashDeposit, setTxHashDeposit] = useState<TxHash>("");
    const [txHashWithdraw, setTxHashWithdraw] = useState<TxHash>("");
    const [waitingDeposit, setWaitingDeposit] = useState<boolean>(false);
    const [waitingWithdraw, setWaitingWithdraw] = useState<boolean>(false);
    const [waitingCalculateEUTxO, setWaitingCalculateEUTxO] = useState<boolean>(false);

    const deposit = async function ({
        lucid,
        sellingStrategies,
    }: {
        lucid: Lucid;
        sellingStrategies: CalculateSellingStrategy[];
    }) {
        try {
            setWaitingDeposit(true);
            const contractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS as string;
            const datumParams = await readDatum({
                contractAddress: contractAddress,
                lucid: lucid,
                txHashRef: enviroment.DUALTARGET_TXHASH_REFERENCE_SCRIPT,
            });
            const vkeyOwnerHash: string = lucid.utils.getAddressDetails(
                await lucid.wallet.address(),
            ).paymentCredential?.hash as string;
            const vkeyBeneficiaryHash: string = lucid.utils.getAddressDetails(contractAddress)
                .paymentCredential?.hash as string;
            const datums: any[] = sellingStrategies.map(function (
                sellingStrategy: CalculateSellingStrategy,
                index: number,
            ) {
                return Data.to<DualtargetDatum>(
                    {
                        odOwner: vkeyOwnerHash,
                        odBeneficiary: vkeyBeneficiaryHash,
                        assetADA: {
                            policyId: datumParams.assetAda.policyId,
                            assetName: datumParams.assetAda.assetName,
                        },
                        amountADA: BigInt(sellingStrategy.amountSend!),
                        assetOut: {
                            policyId: datumParams.assetOut.policyId,
                            assetName: datumParams.assetOut.assetName,
                        },
                        minimumAmountOut: BigInt(sellingStrategy.minimumAmountOut!),
                        minimumAmountOutProfit: BigInt(sellingStrategy.minimumAmountOutProfit!),
                        buyPrice: BigInt(sellingStrategy.buyPrice!),
                        sellPrice: BigInt(sellingStrategy.sellPrice!),
                        odStrategy: datumParams.odStrategy,
                        batcherFee: datumParams.batcherFee,
                        outputADA: datumParams.outputADA,
                        feeAddress: datumParams.feeAddress,
                        validatorAddress: datumParams.validatorAddress,
                        deadline: BigInt(new Date().getTime() + 10 * 1000),
                        isLimitOrder: BigInt(2),
                    },
                    DualtargetDatum,
                );
            });

            let winter_addr: Credential = {
                type: "Key",
                hash: datumParams.feeAddress,
            };
            const freeAddress1 = lucid.utils.credentialToAddress(winter_addr);

            let tx: any = lucid.newTx().payToAddress(freeAddress1, {
                lovelace: BigInt(datumParams.batcherFee) as Lovelace,
            });

            const currentPrice = await getCurrentPrice();

            sellingStrategies.forEach(async function (
                sellingStrategy: CalculateSellingStrategy,
                index: number,
            ) {
                if (
                    Number(sellingStrategy.buyPrice) <=
                    Number(currentPrice.price) * DECIMAL_PLACES
                ) {
                    tx = await tx.payToContract(
                        contractAddress,
                        {
                            inline: datums[index],
                        },
                        {
                            [enviroment.DJED_TOKEN_ASSET!]: BigInt(
                                Math.round(sellingStrategy.amountSend!),
                            ),
                            lovelace: BigInt(OUTPUT_ADA / 2),
                        },
                    );
                } else {
                    tx = await tx.payToContract(
                        contractAddress,
                        { inline: datums[index] },
                        { lovelace: BigInt(sellingStrategy.amountSend!) },
                    );
                }
            });

            tx = await tx.complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) {
                setTxHashDeposit(txHash);
                await refresh();
                setWaitingDeposit(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingDeposit(false);
        }
    };

    const withdraw = async function ({
        lucid,
        claimableUtxos,
    }: {
        lucid: Lucid;
        claimableUtxos: Array<ClaimableUTxO>;
    }) {
        try {
            setWaitingWithdraw(true);
            const refundRedeemer = Data.to(new Constr(1, []));
            const contractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS! as string;
            const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);
            let smartcontractUtxo: UTxO | undefined = scriptUtxos.find(function (scriptUtxo: UTxO) {
                return scriptUtxo.scriptRef?.script;
            });
            if (!smartcontractUtxo) throw new Error("Cound not find smart contract utxo");
            if (claimableUtxos.length === 0) throw new Error("Cound not find utxo not claim");

            let tx: any = lucid.newTx();
            for (const utxoToSpend of claimableUtxos) {
                tx = await tx.collectFrom([utxoToSpend.utxo], refundRedeemer);
            }
            tx = await tx
                .readFrom([smartcontractUtxo])
                .payToAddress(claimableUtxos[0].BatcherFee_addr, {
                    lovelace: BigInt(claimableUtxos[0].fee) as Lovelace,
                })
                .addSigner((await lucid.wallet.address()) as Address)
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) {
                setTxHashWithdraw(txHash);
                await refresh();
                setWaitingWithdraw(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingWithdraw(false);
        }
    };

    const calculateClaimEUTxO = async function ({
        lucid,
        mode,
        min,
        max,
    }: {
        lucid: Lucid;
        mode: number;
        min: number;
        max: number;
    }) {
        setWaitingCalculateEUTxO(true);
        try {
            const paymentAddress: string = lucid.utils.getAddressDetails(
                await lucid.wallet.address(),
            ).paymentCredential?.hash as string;
            const contractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS! as string;
            const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);
            const datumParams = await readDatum({
                contractAddress: contractAddress,
                lucid: lucid,
                txHashRef: enviroment.DUALTARGET_TXHASH_REFERENCE_SCRIPT,
            });
            const claimableUtxos: ClaimableUTxO[] = [];
            for (const scriptUtxo of scriptUtxos) {
                if (scriptUtxo.datum) {
                    const outputDatum: any = Data.from(scriptUtxo.datum!);

                    const params = {
                        odOwner: outputDatum.fields[0],
                        odBeneficiary: outputDatum.fields[1],
                        assetADA: {
                            policyId: datumParams.assetAda.policyId,
                            assetName: datumParams.assetAda.assetName,
                        },
                        amountA: outputDatum.fields[3],
                        assetOut: {
                            policyId: datumParams.assetOut.policyId,
                            assetName: datumParams.assetOut.assetName,
                        },
                        minimumAmountOut: outputDatum.fields[5],
                        minimumAmountOutProfit: outputDatum.fields[6],
                        buyPrice: outputDatum.fields[7],
                        sellPrice: outputDatum.fields[8],
                        odStrategy: datumParams.odStrategy,
                        batcherFee: datumParams.batcherFee,
                        outputADA: datumParams.outputADA,
                        feeAddress: datumParams.feeAddress,
                        validatorAddress: datumParams.validatorAddress,
                        deadline: outputDatum.fields[14],
                        isLimitOrder: outputDatum.fields[15],
                    };

                    switch (mode) {
                        case 0:
                            if (String(params.odOwner) === String(paymentAddress)) {
                                let winter_addr: Credential = {
                                    type: "Key",
                                    hash: params.feeAddress,
                                };
                                const freeAddress1 = lucid.utils.credentialToAddress(winter_addr);
                                claimableUtxos.push({
                                    utxo: scriptUtxo,
                                    BatcherFee_addr: String(freeAddress1),
                                    fee: Number(params.batcherFee),
                                    minimumAmountOut: params.minimumAmountOut, // Số lượng profit
                                    minimumAmountOutProfit: params.minimumAmountOutProfit,
                                    isLimitOrder: params.isLimitOrder,
                                });
                                break;
                            }
                        case 1:
                            if (
                                String(params.odOwner) === String(paymentAddress) &&
                                Number(params.isLimitOrder) === 0
                            ) {
                                let winter_addr: Credential = {
                                    type: "Key",
                                    hash: params.feeAddress,
                                };
                                const freeAddress1 = lucid.utils.credentialToAddress(winter_addr);

                                claimableUtxos.push({
                                    utxo: scriptUtxo,
                                    BatcherFee_addr: String(freeAddress1),
                                    fee: Number(params.batcherFee),
                                    minimumAmountOut: params.minimumAmountOut, // Số lượng profit
                                    minimumAmountOutProfit: params.minimumAmountOutProfit,
                                    isLimitOrder: params.isLimitOrder,
                                });
                            }
                            break;

                        case 2:
                            if (
                                String(params.odOwner) === String(paymentAddress) &&
                                params.buyPrice >= min * 1000000 &&
                                params.buyPrice <= max * 1000000
                            ) {
                                let winter_addr: Credential = {
                                    type: "Key",
                                    hash: params.feeAddress,
                                };
                                const freeAddress1 = lucid.utils.credentialToAddress(winter_addr);

                                claimableUtxos.push({
                                    utxo: scriptUtxo,
                                    BatcherFee_addr: String(freeAddress1),
                                    fee: Number(params.batcherFee),
                                    minimumAmountOut: params.minimumAmountOut, // Số lượng profit
                                    minimumAmountOutProfit: params.minimumAmountOutProfit,
                                    isLimitOrder: params.isLimitOrder,
                                });
                            }
                            break;
                    }
                }
            }

            return claimableUtxos;
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingCalculateEUTxO(false);
        }
        return [];
    };

    const previewWithdraw = async function ({
        lucid,
        range: [min, max],
    }: {
        lucid: Lucid;
        range: [number, number];
    }): Promise<CalculateSellingStrategy[]> {
        const paymentAddress: string = lucid.utils.getAddressDetails(await lucid.wallet.address())
            .paymentCredential?.hash as string;
        const contractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS! as string;
        const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);

        const sellingStrategies: CalculateSellingStrategy[] = [];
        for (const scriptUtxo of scriptUtxos) {
            if (scriptUtxo.datum) {
                const outputDatum: any = await Data.from(scriptUtxo.datum!);
                const params = {
                    odOwner: outputDatum.fields[0],
                    minimumAmountOut: outputDatum.fields[5],
                    minimumAmountOutProfit: outputDatum.fields[6],
                    buyPrice: outputDatum.fields[7],
                    sellPrice: outputDatum.fields[8],
                };

                if (String(params.odOwner) === String(paymentAddress)) {
                    const price = Number(params.buyPrice) / DECIMAL_PLACES;
                    if ((max !== 0 && price > max) || (price < min && min > 0)) {
                        sellingStrategies.push({
                            minimumAmountOut: Number(params.minimumAmountOut),
                            minimumAmountOutProfit: Number(params.minimumAmountOutProfit),
                            buyPrice: Number(params.buyPrice),
                            sellPrice: Number(params.sellPrice),
                        });
                    }

                    if (min === 0 && max === 0) {
                        sellingStrategies.push({
                            minimumAmountOut: Number(params.minimumAmountOut),
                            minimumAmountOutProfit: Number(params.minimumAmountOutProfit),
                            buyPrice: Number(params.buyPrice),
                            sellPrice: Number(params.sellPrice),
                        });
                    }
                }
            }
        }
        return sellingStrategies;
    };

    const previewDeposit = function ({
        sellingStrategies,
        currentPrice,
    }: {
        sellingStrategies: Array<CalculateSellingStrategy>;
        currentPrice: number;
    }) {
        let amountADA = 0;
        let amountDJED = 0;

        sellingStrategies.forEach(function (sellingStrategy: CalculateSellingStrategy) {
            if (Number(sellingStrategy.buyPrice) / DECIMAL_PLACES > currentPrice) {
                amountADA += Number(sellingStrategy.amountSend) / DECIMAL_PLACES;
            } else {
                amountDJED += Number(sellingStrategy.amountSend) / DECIMAL_PLACES;
            }
        });
        return {
            amountADA,
            amountDJED,
        };
    };

    return (
        <SmartContractContext.Provider
            value={{
                previewDeposit,
                deposit,
                calculateClaimEUTxO,
                withdraw,
                previewWithdraw,
                txHashDeposit,
                txHashWithdraw,
                waitingDeposit,
                waitingWithdraw,
                waitingCalculateEUTxO,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
