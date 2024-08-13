import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import convertInlineDatum from "~/helpers/convert-inline-datum";
import convertDatetime from "~/helpers/convert-datetime";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";
import readEnviroment from "~/utils/read-enviroment";
import { DECIMAL_PLACES } from "~/constants";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const epochNo: string = searchParams.get("epoch") as string;
    const network: string = searchParams.get("network") as CardanoNetwork;
    const enviroment = readEnviroment({ network: network, index: 0 });
    const stakeAddress: string = enviroment.DUALTARGET_STAKE_ADDRESS;
    const smartcontractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS;
    const koios = new Koios(enviroment.KOIOS_RPC_URL);
    const poolId: string = enviroment.HADA_POOL_ID;
    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY as string,
        network as CardanoNetwork,
    );

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

    const smartcontractUtxo = await blockfrost.addressesUtxos(smartcontractAddress);

    const uniqueTxs = Array.from(new Map(addrTsx.map((tx) => [tx.tx_hash, tx])).values());
    const wallets = new Set<string>();
    const { start_time, end_time } = await koios.epochInfomation({ epochNo: Number(epochNo) });

    const txsUtxos = await Promise.all(
        uniqueTxs.map(async function ({ tx_hash }) {
            return await blockfrost.txsUtxos(tx_hash);
        }),
    );

    if (txsUtxos.length !== 0) {
        await Promise.all(
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
                                datum?.fields[0].bytes.length === 56
                            ) {
                                wallets.add(datum?.fields[0].bytes);
                                return output;
                            }
                        }
                        return null;
                    }),
                );
                return outputs.filter((output) => output !== null);
            }),
        );
        await Promise.all(
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
                                datum?.fields[0].bytes.length === 56
                            ) {
                                wallets.add(datum?.fields[0].bytes);
                                return input;
                            }
                        }
                        return null;
                    }),
                );
                return inputs.filter((input) => input !== null);
            }),
        );
    }
    const currentEpoch = await blockfrost.epochsLatest();
    const results = await Promise.all(
        Array.from(wallets).map(async function (paymentAddress: string) {
            let adaPool = 0;

            for (const scriptUtxo of smartcontractUtxo) {
                if (!scriptUtxo.reference_script_hash) {
                    const datum = await convertInlineDatum({
                        inlineDatum: scriptUtxo.inline_datum!,
                    });

                    if (datum?.fields[0].bytes === paymentAddress) {
                        adaPool += Number(
                            scriptUtxo.amount.reduce(function (total, { unit, quantity }) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }
                                return total;
                            }, 0),
                        );
                    }
                }
            }
            let caculateAdaRewardsShift: any = [];

            for (let epoch = currentEpoch.epoch; epoch >= currentEpoch.epoch - 4; epoch--) {
                const { start_time, end_time } = await koios.epochInfomation({ epochNo: epoch });
                const addrTsxFilter = uniqueTxs.filter(function ({ block_time }, index: number) {
                    return block_time >= start_time && block_time <= end_time;
                });

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

                if (txsUtxos.length !== 0) {
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
                                            outputs.amount.reduce(function (
                                                total,
                                                { unit, quantity },
                                            ) {
                                                if (unit === "lovelace") {
                                                    return total + Number(quantity);
                                                }
                                                return total;
                                            },
                                            0),
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
                                            inputs.amount.reduce(function (
                                                total,
                                                { unit, quantity },
                                            ) {
                                                if (unit === "lovelace") {
                                                    return total + Number(quantity);
                                                }
                                                return total;
                                            },
                                            0),
                                        )
                                    );
                                }
                                return amount;
                            }, 0);
                        })
                        .reduce(function (balance, current) {
                            return balance + current;
                        });

                    caculateAdaRewardsShift.push({
                        amount: amountDeposit - amountWithdraw,
                        epoch: epoch,
                        adaPool: adaPool,
                        amountReward: accountRewards,
                        amountStake: amountStake,
                    });
                } else {
                    caculateAdaRewardsShift.push({
                        amount: 0,
                        epoch: epoch,
                        adaPool: adaPool,
                        amountReward: accountRewards,
                        amountStake: amountStake,
                    });
                }
            }
            let caculateAdaRewardsShift1 = [];
            let caculateAdaRewardTemp = 0;
            for (let index = 0; index < caculateAdaRewardsShift.length; index++) {
                if (index === 1) {
                    caculateAdaRewardTemp +=
                        Number(caculateAdaRewardsShift[index].adaPool) -
                        Number(caculateAdaRewardsShift[index - 1].amount / DECIMAL_PLACES) -
                        Number(caculateAdaRewardsShift[index].amount / DECIMAL_PLACES);
                }
                if (index > 1)
                    caculateAdaRewardTemp -= Number(
                        caculateAdaRewardsShift[index].amount / DECIMAL_PLACES,
                    );

                caculateAdaRewardsShift1.push({
                    amountRewardInline: caculateAdaRewardTemp,
                    epoch: caculateAdaRewardsShift[index].epoch,
                    adaPool: caculateAdaRewardsShift[index].adaPool,
                    amountReward: caculateAdaRewardsShift[index].amountReward,
                    amountStake: caculateAdaRewardsShift[index].amountStake,
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

            const epochFilter = caculateAdaRewardsShift2.find(function (caculateAdaRewards) {
                return Number(caculateAdaRewards.epoch) === Number(epochNo);
            });

            return {
                paymentAddress: paymentAddress,
                ...epochFilter,
            };
        }),
    );

    console.log(results);

    return Response.json({
        startTime: convertDatetime(start_time),
        endTime: convertDatetime(end_time),
        results: results,
    });
}
