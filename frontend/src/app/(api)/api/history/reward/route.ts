import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { C } from "lucid-cardano";
import { NextRequest } from "next/server";
import { BATCHER_FEE, DECIMAL_PLACES } from "~/constants";
import convertDatetime from "~/helpers/convert-datetime";
import convertInlineDatum from "~/helpers/convert-inline-datum";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";
import caculateDepositWithdraw from "~/utils/calculate-deposit-withdraw";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const adaPool: string = searchParams.get("ada_pool") as string;
    const paymentAddress: string = searchParams.get("payment_address") as string;
    const enviroment = readEnviroment({ network: network, index: 0 });

    const poolId: string = enviroment.HADA_POOL_ID;
    const stakeAddress: string = enviroment.DUALTARGET_STAKE_ADDRESS;
    const smartcontractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS;
    const koios = new Koios(enviroment.KOIOS_RPC_URL);
    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY as string,
        network as CardanoNetwork,
    );

    const accountsDelegation = await blockfrost.accountsDelegations(stakeAddress);

    const specificTransaction = await blockfrost.txs(
        accountsDelegation[accountsDelegation.length - 1].tx_hash,
    );

    const currentEpoch = await blockfrost.epochsLatest();

    // TODO: 5 QUERY
    const addrTsx = (
        await Promise.all(
            Array.from({ length: 5 }, async function (_, index: number) {
                return await blockfrost.addressesTransactions(smartcontractAddress, {
                    order: "desc",
                    count: 100,
                    page: index + 1,
                });
            }),
        )
    ).flat();

    // Remove duplicate transactions based on tx_hash
    const uniqueTxs = Array.from(new Map(addrTsx.map((tx) => [tx.tx_hash, tx])).values());

    let results: any = [];

    for (let epoch = currentEpoch.epoch; epoch >= currentEpoch.epoch - 4; epoch--) {
        const { start_time, end_time } = await koios.epochInfomation({ epochNo: epoch });

        const addrTsxFilter = uniqueTxs.filter(function ({ block_time }, index: number) {
            return block_time >= start_time && block_time <= end_time;
        });

        // Đọc các UTXO của smartcontract trong khoảng 1 epoch
        const txsUtxos = await Promise.all(
            addrTsxFilter.map(async function ({ tx_hash }) {
                return await blockfrost.txsUtxos(tx_hash);
            }),
        );

        const amountStake: number = await koios.poolDelegatorsHistory({
            poolId: poolId,
            stakeAddress: stakeAddress,
            epochNo: epoch,
        });
        const accountRewards: number = await koios.accountRewards({
            stakeAddress,
            epochNo: epoch,
        });

        console.log("epoch " + epoch + " :" + amountStake, accountRewards);
        if (txsUtxos.length !== 0) {
            // console.log(txsUtxos)
            // Deposit(+): Output là địa chỉ smc
            const depositUtxos = await Promise.all(
                txsUtxos.map(async function (txsUtxo) {
                    const outputs = await Promise.all(
                        txsUtxo.outputs.map(async function (output) {
                            if (output.inline_datum) {
                                const datum = await convertInlineDatum({
                                    inlineDatum: output.inline_datum!,
                                });
                                if (
                                    output.address === smartcontractAddress &&
                                    output.inline_datum !== null &&
                                    datum?.fields[0].bytes === paymentAddress
                                ) {
                                    return output;
                                }
                            }
                            return null;
                        }),
                    );
                    return outputs.filter((output) => output !== null);
                }),
            );

            // Withdraw(-): Input là địa chỉ của smc
            const withdrawUtxos = await Promise.all(
                txsUtxos.map(async function (txsUtxo) {
                    const inputs = await Promise.all(
                        txsUtxo.inputs.map(async function (input) {
                            if (input.inline_datum) {
                                const datum = await convertInlineDatum({
                                    inlineDatum: input.inline_datum!,
                                });
                                if (
                                    input.address === smartcontractAddress &&
                                    !input.reference_script_hash &&
                                    input.inline_datum !== null &&
                                    datum?.fields[0].bytes === paymentAddress
                                ) {
                                    return input;
                                }
                            }
                            return null;
                        }),
                    );
                    return inputs.filter((input) => input !== null);
                }),
            );
            // Read datum inputs

            const amountDeposit = depositUtxos
                .map(function (depositUtxo) {
                    return depositUtxo.reduce(function (amount, outputs) {
                        if (outputs && outputs.amount) {
                            return (
                                amount +
                                Number(
                                    outputs.amount.reduce(function (total, { unit, quantity }) {
                                        if (unit === "lovelace") {
                                            return total + Number(quantity);
                                        }
                                        return total;
                                    }, 0),
                                )
                            );
                        }

                        return amount;
                    }, 0);
                })
                .reduce(function (balance, current) {
                    return balance + current;
                });

            const amountWithdraw = withdrawUtxos
                .map(function (depositUtxo) {
                    return depositUtxo.reduce(function (amount, inputs) {
                        if (inputs && inputs.amount) {
                            return (
                                amount +
                                Number(
                                    inputs.amount.reduce(function (total, { unit, quantity }) {
                                        if (unit === "lovelace") {
                                            return total + Number(quantity);
                                        }
                                        return total;
                                    }, 0),
                                )
                            );
                        }
                        return amount;
                    }, 0);
                })
                .reduce(function (balance, current) {
                    return balance + current;
                });

            results.push({
                amount: amountDeposit - amountWithdraw,
                epoch: epoch,
                adaPool: adaPool,
                amountReward: accountRewards,
                amountStake: amountStake,
                // amountDeposit: amountDeposit,
                // amountWithdraw: amountWithdraw,
            });
        } else {
            results.push({
                amount: 0,
                epoch: epoch,
                adaPool: adaPool,
                amountReward: accountRewards,
                amountStake: amountStake,
                // amountDeposit: amountDeposit,
                // amountWithdraw: amountWithdraw,
            });
        }
    }

    let caculateAdaRewardsShift1 = [];
    let caculateAdaRewardTemp = 0;
    for (let index = 0; index < results.length; index++) {
        if (index === 1) {
            caculateAdaRewardTemp +=
                Number(results[index].adaPool) -
                Number(results[index - 1].amount / DECIMAL_PLACES) -
                Number(results[index].amount / DECIMAL_PLACES);
        }
        if (index > 1) caculateAdaRewardTemp -= Number(results[index].amount / DECIMAL_PLACES);

        caculateAdaRewardsShift1.push({
            amountRewardInline: caculateAdaRewardTemp,
            epoch: results[index].epoch,
            adaPool: results[index].adaPool,
            amountReward: results[index].amountReward,
            amountStake: results[index].amountStake,
        });
    }

    let caculateAdaRewardsShift2 = [];

    for (let index = 0; index < caculateAdaRewardsShift1.length - 1; index++) {
        const reward =
            (caculateAdaRewardsShift1[index + 1].amountRewardInline *
                Number(caculateAdaRewardsShift1[index].amountReward)) /
            Number(caculateAdaRewardsShift1[index].amountStake);
        if (index > 1) {
            caculateAdaRewardsShift2.push({
                rewards: reward.toFixed(5),
                amount: caculateAdaRewardsShift1[index + 1].amountRewardInline.toFixed(5),
                epoch: caculateAdaRewardsShift1[index].epoch,
                adaPool: caculateAdaRewardsShift1[index].adaPool,
                amountReward: caculateAdaRewardsShift1[index].amountReward,
                amountStake: caculateAdaRewardsShift1[index].amountStake,
                status: "Distributed",
            });
        } else {
            caculateAdaRewardsShift2.push({
                rewards: "-",
                amount: caculateAdaRewardsShift1[index + 1].amountRewardInline.toFixed(5),
                epoch: caculateAdaRewardsShift1[index].epoch,
                adaPool: caculateAdaRewardsShift1[index].adaPool,
                amountReward: caculateAdaRewardsShift1[index].amountReward,
                amountStake: caculateAdaRewardsShift1[index].amountStake,
                status: "Distributed",
            });
        }
    }

    const totalPage = Math.ceil(caculateAdaRewardsShift2.length / Number(pageSize));
    const histories = [...caculateAdaRewardsShift2].slice(
        (Number(page) - 1) * Number(pageSize),
        Number(page) * Number(pageSize),
    );

    return Response.json({
        totalPage,
        histories,
        totalItems: caculateAdaRewardsShift2.length,
    });
}
