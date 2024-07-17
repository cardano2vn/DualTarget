import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import { DECIMAL_PLACES } from "~/constants";
import convertDatetime from "~/helpers/convert-datetime";
import Blockfrost from "~/services/blockfrost";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const pageSize: string = searchParams.get("page_size") as string;
    const walletAddress: string = searchParams.get("wallet_address") as string;

    const enviroment = readEnviroment({ network: network });

    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY,
        network as CardanoNetwork,
    );

    // Fetch transactions from Blockfrost
    // TODO: 5 QUERY
    const transactions = (
        await Promise.all(
            Array.from({ length: 5 }, async function (_, index: number) {
                return await blockfrost.addressesTransactions(walletAddress, {
                    order: "asc",
                    count: 100,
                    page: index + 1,
                });
            }),
        )
    ).flat();

    // Remove duplicates based on tx_hash
    const uniqueTransactions = Array.from(
        new Map(transactions.map((tx) => [tx.tx_hash, tx])).values(),
    ).reverse();

    // Fetch UTXOs and block_time for unique transactions
    const results = await Promise.all(
        uniqueTransactions.map(async function ({ tx_hash, block_time }) {
            return {
                block_time: convertDatetime(block_time),
                utxos: await blockfrost.txsUtxos(tx_hash),
            };
        }),
    );

    // console.log(results)

    const addressToFind = enviroment.DUALTARGET_CONTRACT_ADDRESS;
    const transactionsWithTargetAddress = await Promise.all(
        results
            .map((transaction) => {
                const hasInput = transaction.utxos.inputs.some(
                    (input) => input.address === addressToFind,
                );

                const hasOutput = transaction.utxos.outputs.some(
                    (output) => output.address === addressToFind,
                );

                if (hasInput) {
                    let amountADA: number = 0;
                    let amountDJED: number = 0;

                    transaction.utxos.inputs.forEach(function (input) {
                        if (input.address === addressToFind) {
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

                            amountADA += quantityADA;
                            amountDJED += quantityDJED;
                        }
                    }, 0);
                    return {
                        type: "Withdraw",
                        txHash: transaction.utxos.hash,
                        amountADA: +(amountADA / DECIMAL_PLACES).toFixed(5),
                        amountDJED: +(amountDJED / DECIMAL_PLACES).toFixed(6),
                        status: "Completed",
                        blockTime: transaction.block_time,
                    };
                }

                if (hasOutput) {
                    let amountADA: number = 0;
                    let amountDJED: number = 0;
                    transaction.utxos.outputs.forEach(function (output) {
                        if (output.address === addressToFind) {
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
                    return {
                        blockTime: transaction.block_time,
                        txHash: transaction.utxos.hash,
                        type: "Deposit",
                        amountADA: +(amountADA / DECIMAL_PLACES).toFixed(6),
                        amountDJED: +(amountDJED / DECIMAL_PLACES).toFixed(6),
                        status: "Completed",
                    };
                }
            })
            .filter((output) => output != null),
    );

    const totalPage = Math.ceil(transactionsWithTargetAddress.length / Number(pageSize));
    const histories = [...transactionsWithTargetAddress].slice(
        (Number(page) - 1) * Number(pageSize),
        Number(page) * Number(pageSize),
    );

    return Response.json({
        totalPage: totalPage,
        histories,
        totalItems: transactionsWithTargetAddress.length,
    });
}
