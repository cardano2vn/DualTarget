import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";
import caculateDepositWithdraw from "~/utils/calculate-deposit-withdraw";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const walletAddress: string = searchParams.get("wallet_address") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;

    const enviroment = readEnviroment({
        network: network,
        index: 0,
    });

    const poolId: string = enviroment.HADA_POOL_ID;
    const stakeAddress: string = enviroment.DUALTARGET_STAKE_ADDRESS;
    const smartcontractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS;

    const koios = new Koios(enviroment.KOIOS_RPC_URL);

    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY as string,
        network as CardanoNetwork,
    );

    const utxos = await Promise.all(
        (await blockfrost.addressesTransactions(walletAddress))
            .reverse()
            .map(async function ({ tx_hash, block_time }) {
                return {
                    block_time: block_time,
                    utxos: await blockfrost.txsUtxos(tx_hash),
                };
            }),
    );

    const currentEpoch = await blockfrost.epochsLatest();

    let results: any = [];

    for (let index = currentEpoch.epoch; index >= currentEpoch.epoch - 5; index--) {
        const epochInfomation = await koios.epochInfomation({ epochNo: index });
        const amountStake: number = await koios.poolDelegatorsHistory({
            poolId: poolId,
            stakeAddress: stakeAddress,
            epochNo: index,
        });

        const accountRewards: number = await koios.accountRewards({ stakeAddress, epochNo: index });

        const amountDepositWithdraw: number = await caculateDepositWithdraw({
            utxos: utxos,
            address: smartcontractAddress,
            endTime: epochInfomation.end_time,
        });

        const ROS: number = amountDepositWithdraw / amountStake;

        results.push({
            epoch: index,
            amount: amountDepositWithdraw.toFixed(5),
            rewards: (!isNaN(accountRewards * ROS) ? accountRewards * ROS : 0).toFixed(5),
            status: "Distributed",
        });
    }

    const totalPage = Math.ceil(results.length / Number(pageSize));
    const histories = [...results].slice(
        (Number(page) - 1) * Number(pageSize),
        Number(page) * Number(pageSize),
    );

    return Response.json({
        totalPage,
        histories,
        totalItems: results.length,
    });
}
