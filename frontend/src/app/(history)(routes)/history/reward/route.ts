import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import Koios from "~/services/koios";
import caculateDepositWithdraw from "~/utils/calculate-deposit-withdraw";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const walletAddress: string = searchParams.get("wallet_address") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;

    const epoch: string = process.env.EPOCH_POOL_ID as string;
    const poolId: string = process.env.HADA_POOL_ID as string;
    const stakeAddress: string = process.env.DUALTARGET_STAKE_ADDRESS_PREPROP as string;
    const smartcontractAddress: string = process.env.DUALTARGET_PAYMENT_ADDRESS_PREPROP as string;
    const koios = new Koios(process.env.KOIOS_RPC_URL_MAINNET!);

    const API = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        network: "preprod",
    });

    const utxos = await Promise.all(
        (await API.addressesTransactions(walletAddress)).reverse().map(async function ({ tx_hash, block_time }) {
            return {
                block_time: block_time,
                utxos: await API.txsUtxos(tx_hash),
            };
        }),
    );

    let results: any = [];

    for (let i = 480; i >= 475; i--) {
        const epochInfomation = await koios.epochInfomation({ epochNo: i });
        const amountStake = await koios.poolDelegatorsHistory({ poolId: poolId, stakeAddress: stakeAddress, epochNo: i });
        const accountRewards = await koios.accountRewards({ stakeAddress, epochNo: i });
        console.log(amountStake, accountRewards);
        const amountDepositWithdraw = await caculateDepositWithdraw({
            utxos: utxos,
            address: smartcontractAddress,
            endTime: epochInfomation.end_time,
        });

        const ROS = amountDepositWithdraw / amountStake;

        results.push({
            epoch: i,
            amount: amountDepositWithdraw.toFixed(5),
            rewards: (accountRewards * ROS).toFixed(5),
            status: "Distributed",
        });
    }

    const totalPage = Math.ceil(results.length / Number(pageSize));
    const histories = [...results].slice((Number(page) - 1) * Number(pageSize), Number(page) * Number(pageSize));

    return Response.json({
        totalPage,
        histories,
        totalItems: results.length,
    });
}
