import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
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

    let results: any = [];

    for (let epoch = currentEpoch.epoch; epoch >= currentEpoch.epoch - 7; epoch--) {
        const { start_time, end_time } = await koios.epochInfomation({ epochNo: epoch });

        const addrTsxFilter = addrTsx.filter(function ({ block_time }, index: number) {
            return block_time >= start_time && block_time <= end_time;
        });

        // Đọc các UTXO của smartcontract trong khoảng 1 epoch
        const txsUtxos = await Promise.all(
            addrTsxFilter.map(async function ({ tx_hash }) {
                return await blockfrost.txsUtxos(tx_hash);
            }),
        );

        // Deposit(+): Output là địa chỉ smc
        const depositUtxos = await Promise.all(
            txsUtxos.map(async function (txsUtxo) {
                const outputs = await Promise.all(
                    txsUtxo.outputs.map(async function (output) {
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

        const amountStake: number = await koios.poolDelegatorsHistory({
            poolId: poolId,
            stakeAddress: stakeAddress,
            epochNo: epoch,
        });
        const accountRewards: number = await koios.accountRewards({
            stakeAddress,
            epochNo: epoch,
        });

        results.push({
            amount: -amountDeposit + amountWithdraw,
            epoch: epoch,
            adaPool: adaPool,
            amountReward: accountRewards,
            amountStake: amountStake,
        });
    }

    let caculateAdaRewards = [];
    let caculateAdaRewardTemp = 0;
    for (let index = 1; index < results.length; index++) {
        if (index === 1) {
            caculateAdaRewardTemp +=
                Number(results[index - 1].adaPool) +
                Number(results[index - 1].amount / DECIMAL_PLACES) +
                Number(results[index].amount / DECIMAL_PLACES);
        }
        caculateAdaRewardTemp += Number(results[index].amount / DECIMAL_PLACES);

        const reward =
            (caculateAdaRewardTemp * Number(results[index - 1].amountReward)) /
            Number(results[index - 1].amountStake);

        if (
            results[index - 1].epoch === currentEpoch.epoch &&
            results[index - 1].epoch === currentEpoch.epoch - 1
        ) {
            caculateAdaRewards.push({
                epoch: results[index - 1].epoch,
                amount: caculateAdaRewardTemp.toFixed(5),
                rewards: "-",
                status: "Distributed",
            });
        } else {
            caculateAdaRewards.push({
                epoch: results[index - 1].epoch,
                amount: caculateAdaRewardTemp.toFixed(5),
                rewards: reward.toFixed(5),
                status: "Distributed",
            });
        }
    }

    const totalPage = Math.ceil(caculateAdaRewards.length / Number(pageSize));
    const histories = [...caculateAdaRewards].slice(
        (Number(page) - 1) * Number(pageSize),
        Number(page) * Number(pageSize),
    );

    return Response.json({
        totalPage,
        histories,
        totalItems: caculateAdaRewards.length,
    });
}
