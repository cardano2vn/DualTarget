import axios from "axios";
import { NextRequest } from "next/server";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { BlockfrostAdapter, NetworkId } from "@minswap/sdk";

export async function GET(request: NextRequest) {
    const api = new BlockfrostAdapter({
        blockFrost: new BlockFrostAPI({
            projectId: "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC",
            network: "mainnet",
        }),
    });
    for (let i = 1; ; i++) {
        const pools = await api.getPools({
            page: i,
        });
        console.log(pools);
        if (pools.length === 0) {
            // last page
            break;
        }
        const minADAPool = pools.find(
            (p) =>
                p.assetA === "lovelace" &&
                p.assetB === "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e",
        );
        if (minADAPool) {
            const [a, b] = await api.getPoolPrice({ pool: minADAPool });
            console.log(`ADA/MIN price: ${a.toString()}; MIN/ADA price: ${b.toString()}`);
            // we can later use this ID to call getPoolById
            console.log(`ADA/MIN pool ID: ${minADAPool.id}`);
            break;
        }
    }

    return Response.json({});
}
