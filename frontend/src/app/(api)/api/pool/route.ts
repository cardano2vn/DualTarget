import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import { DECIMAL_PLACES } from "~/constants";
import Blockfrost from "~/services/blockfrost";
import { EnviromentType } from "~/types/GenericsType";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const enviroment: EnviromentType = readEnviroment({
        network: network,
    });

    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY,
        network as CardanoNetwork,
    );
    const now = Date.now();
    const sevenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;
    const txHashes = await Promise.all(
        await blockfrost.addressesTransactions(enviroment.DUALTARGET_CONTRACT_ADDRESS, {
            order: "desc",
        }),
    );
    const contractAddress = enviroment.DUALTARGET_CONTRACT_ADDRESS;

    const txHashesFilter = txHashes.filter(function (txHashFilter) {
        return (
            txHashFilter.block_time * 1000 >= sevenDaysAgo && txHashFilter.block_time * 1000 < now
        );
    });

    const inputs = await Promise.all(
        txHashesFilter.map(async function ({ tx_hash }) {
            const utxo = await blockfrost.txsUtxos(tx_hash);

            return utxo.inputs;
        }),
    );

    let inlineDatums: any[] = [];

    inputs.map((input) => {
        input.map((item) => {
            if (
                item.address === enviroment.DUALTARGET_CONTRACT_ADDRESS &&
                !item.reference_script_hash &&
                item.inline_datum
            ) {
                inlineDatums.push(item.inline_datum);
            }
        });
    });

    const results = await Promise.all(
        (
            await blockfrost.addressesTransactions(contractAddress, {
                order: "desc",
            })
        )
            .reverse()
            .map(async function ({ tx_hash }) {
                return {
                    utxos: await blockfrost.txsUtxos(tx_hash),
                };
            }),
    );

    let adaMargin = 0;
    let djedMargin = 0;

    await Promise.all(
        results.map((transaction) => {
            const hasInput = transaction.utxos.inputs.some(
                (input) => input.address === contractAddress,
            );

            const hasOutput = transaction.utxos.outputs.some(
                (output) => output.address === contractAddress,
            );

            if (hasInput) {
                let amountADA: number = 0;
                let amountDJED: number = 0;

                transaction.utxos.inputs.forEach(function (input) {
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
                transaction.utxos.outputs.forEach(function (output) {
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
        inlineDatums: inlineDatums,
        adaMargin: +(adaMargin / DECIMAL_PLACES).toFixed(6),
        djedMargin: +(djedMargin / DECIMAL_PLACES).toFixed(6),
    });
}
