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

    inputs.forEach((input) => {
        input.forEach((item) => {
            if (
                item.address === enviroment.DUALTARGET_CONTRACT_ADDRESS &&
                !item.reference_script_hash &&
                item.inline_datum
            ) {
                inlineDatums.push(item.inline_datum);
            }
        });
    });

    return Response.json(inlineDatums);
}
