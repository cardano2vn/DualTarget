import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import convertDatetime from "~/helpers/convert-datetime";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const walletAddress: string = searchParams.get("wallet_address") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;

    const API = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        network: "preprod",
    });

    const results = await Promise.all(
        (await API.addressesTransactions(walletAddress)).reverse().map(async function ({ tx_hash, block_time }) {
            return {
                block_time: convertDatetime(block_time),
                utxos: await API.txsUtxos(tx_hash),
            };
        }),
    );

    const addressToFind = "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk";

    const transactionsWithTargetAddress = await Promise.all(
        results
            .map((transaction) => {
                const hasInput = transaction.utxos.inputs.some((input) => input.address === addressToFind);

                const hasOutput = transaction.utxos.outputs.some((output) => output.address === addressToFind);
                if (hasInput) {
                    let amount: number = -39000000;

                    transaction.utxos.inputs.forEach(function (input) {
                        if (input.address === addressToFind) {
                            const quantity = input.amount.reduce(function (total: number, { unit, quantity }) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }

                                return total;
                            }, 0);

                            amount += quantity;
                        }
                    }, 0);
                    return {
                        type: "Withdraw",
                        txHash: transaction.utxos.hash,
                        amount: +(amount / 1000000).toFixed(5),
                        status: "Completed",
                        fee: 1.5,
                        blockTime: transaction.block_time,
                    };
                }

                if (hasOutput) {
                    let amount: number = 0;
                    transaction.utxos.outputs.forEach(function (output) {
                        if (output.address === addressToFind) {
                            const quantity = output.amount.reduce(function (total: number, { unit, quantity }) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }

                                return total;
                            }, 0);

                            amount += quantity;
                        }
                    }, 0);
                    return {
                        blockTime: transaction.block_time,
                        txHash: transaction.utxos.hash,
                        type: "Deposit",
                        amount: +(amount / 1000000).toFixed(5),
                        status: "Completed",
                        fee: 1.5,
                    };
                }
            })
            .filter((output) => output != null),
    );
    const totalPage = Math.ceil(transactionsWithTargetAddress.length / Number(pageSize));
    const histories = [...transactionsWithTargetAddress].slice((Number(page) - 1) * Number(pageSize), Number(page) * Number(pageSize));

    return Response.json({
        totalPage: totalPage,
        histories,
        totalItems: transactionsWithTargetAddress.length,
    });
}
