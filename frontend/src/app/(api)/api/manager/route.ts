import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const epochNo: string = searchParams.get("epoch") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const network: string = searchParams.get("network") as CardanoNetwork;

    const blockfrost = new Blockfrost(
        network === "preprod"
            ? process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!
            : process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!,
        network as CardanoNetwork,
    );

    const koios = new Koios(
        network === "preprod"
            ? (process.env.KOIOS_RPC_URL_PREPROD! as string)
            : (process.env.KOIOS_RPC_URL_MAINNET! as string),
    );

    const stakeAddress: string =
        network === "preprod"
            ? (process.env.DUALTARGET_STAKE_ADDRESS_PREPROD as string)
            : (process.env.DUALTARGET_STAKE_ADDRESS_MAINNET as string);

    const poolId: string =
        network === "preprod"
            ? (process.env.POOL_ID_PREPROD as string)
            : (process.env.POOL_ID_MAINNET! as string);

    const smartcontractAddress: string =
        network === "preprod"
            ? (process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD as string)
            : (process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET as string);
    const epochInfomation = await koios.epochInfomation({
        epochNo: Number(epochNo),
    });

    const utxos = await Promise.all(
        (await blockfrost.addressesTransactions(smartcontractAddress))
            .reverse()
            .map(async function ({ tx_hash, block_time }) {
                const addressTx = await blockfrost.txsWithdrawals(tx_hash);
                // console.log(tx_hash);
                // console.log(addressTx);
                return {
                    block_time: block_time,
                    utxos: await blockfrost.txsUtxos(tx_hash),
                };
            }),
    );

    const utxosFilter = await Promise.all(
        utxos.filter(function ({ block_time }) {
            return (
                block_time <= epochInfomation.end_time && block_time >= epochInfomation.start_time
            );
        }),
    );
    return Response.json({
        utxosFilter,
        epochInfomation: epochInfomation,
    });
}
