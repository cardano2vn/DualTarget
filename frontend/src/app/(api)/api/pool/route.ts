import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import { DECIMAL_PLACES, HISTORY_DAYS } from "~/constants";
import convertInlineDatum from "~/helpers/convert-inline-datum";
import Blockfrost from "~/services/blockfrost";
import { EnviromentType } from "~/types/GenericsType";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const enviroment: EnviromentType = readEnviroment({ network: network });

    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY,
        network as CardanoNetwork,
    );

    const contractAddress = enviroment.DUALTARGET_CONTRACT_ADDRESS;

    const addrTsx = (
        await Promise.all(
            Array.from({ length: 5 }, async function (_, index: number) {
                return await blockfrost.addressesTransactions(contractAddress, {
                    order: "desc",
                    count: 100,
                    page: index + 1,
                });
            }),
        )
    ).flat();

    const addrTsxFilter = await Promise.all(
        addrTsx.filter(function ({ block_time }) {
            return (
                block_time * 1000 >= Date.now() - HISTORY_DAYS * 24 * 60 * 60 * 1000 &&
                block_time * 1000 <= Date.now()
            );
        }),
    );

    const utxos = await Promise.all(
        addrTsxFilter.map(async function ({ tx_hash }) {
            const { inputs, outputs } = await blockfrost.txsUtxos(tx_hash);
            return { inputs, outputs };
        }),
    );
    let profitMargin: number = 0;
    let adaMargin: number = 0;
    let djedMargin: number = 0;

    await Promise.all(
        addrTsxFilter.map(async ({ tx_hash }) => {
            const { inputs, outputs } = await blockfrost.txsUtxos(tx_hash);

            inputs.forEach(async (input) => {
                if (
                    input.address === contractAddress &&
                    !input.reference_script_hash &&
                    input.inline_datum
                ) {
                    try {
                        const datum = await convertInlineDatum({
                            inlineDatum: input.inline_datum,
                        });

                        if (datum?.fields[15].int === 0) {
                            const profit: number = input.amount.reduce(
                                (total, { quantity, unit }) => {
                                    if (unit === enviroment.DJED_TOKEN_ASSET) {
                                        return total + Number(quantity);
                                    }
                                    return total;
                                },
                                0,
                            );
                            console.log(profit);
                            profitMargin += profit;
                        }
                    } catch (error) {
                        console.error("Error fetching script datum for input:", error);
                    }
                }
            });

            outputs.forEach(async (output) => {
                if (
                    output.address === contractAddress &&
                    !output.reference_script_hash &&
                    output.inline_datum
                ) {
                    try {
                        const datum = await convertInlineDatum({
                            inlineDatum: output.inline_datum,
                        });

                        if (datum?.fields[15].int === 0) {
                            const profit: number = output.amount.reduce(
                                (total, { quantity, unit }) => {
                                    if (unit === enviroment.DJED_TOKEN_ASSET) {
                                        return total + Number(quantity);
                                    }
                                    return total;
                                },
                                0,
                            );
                            profitMargin += profit;
                        }
                    } catch (error) {
                        console.error("Error fetching script datum for output:", error);
                    }
                }
            });
        }),
    );

    await Promise.all(
        utxos.map((transaction) => {
            const hasInput = transaction.inputs.some((input) => input.address === contractAddress);

            const hasOutput = transaction.outputs.some(
                (output) => output.address === contractAddress,
            );

            if (hasInput) {
                transaction.inputs.forEach(function (input) {
                    if (input.address === contractAddress) {
                        const quantityADA = input.amount.reduce(function (
                            total: number,
                            { unit, quantity },
                        ) {
                            if (unit === "lovelace" && !input.reference_script_hash) {
                                return total + Number(quantity);
                            }
                            return total;
                        },
                        0);
                        const quantityDJED = input.amount.reduce(function (
                            total: number,
                            { quantity, unit },
                        ) {
                            if (unit === enviroment.DJED_TOKEN_ASSET) {
                                return total + Number(quantity);
                            }
                            return total;
                        },
                        0);

                        adaMargin += quantityADA;
                        djedMargin += quantityDJED;
                    }
                }, 0);
            }

            if (hasOutput) {
                let amountADA: number = 0;
                let amountDJED: number = 0;
                transaction.outputs.forEach(function (output) {
                    if (output.address === contractAddress) {
                        const quantityADA: number = output.amount.reduce(function (
                            total: number,
                            { unit, quantity },
                        ) {
                            if (unit === "lovelace") {
                                return total + Number(quantity);
                            }

                            return total;
                        },
                        0);
                        const quantityDJED: number = output.amount.reduce(function (
                            total: number,
                            { unit, quantity },
                        ) {
                            if (unit === enviroment.DJED_TOKEN_ASSET) {
                                return total + Number(quantity);
                            }

                            return total;
                        },
                        0);

                        amountADA += quantityADA;
                        amountDJED += quantityDJED;
                    }
                }, 0);
            }
        }),
    );

    return Response.json({
        profitMargin: +(profitMargin / DECIMAL_PLACES).toFixed(6),
        adaMargin: +(adaMargin / DECIMAL_PLACES).toFixed(6),
        djedMargin: +(djedMargin / DECIMAL_PLACES).toFixed(6),
    });
}
