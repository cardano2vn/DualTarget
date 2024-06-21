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
        if (pools.length === 0) {
            // last page
            break;
        }
        const minADAPool = pools.find(
            (p) =>
                p.assetA === "lovelace" &&
                p.assetB ===
                    "8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61.446a65644d6963726f555344",
        );

        const djedAdaPool: any = "d944eda9d4fd8c26171a4362539bfd4ccf35f5a4d0cc7525b22327b997a4f4b9";
        if (minADAPool) {
            const [a, b] = await api.getPoolPrice({ pool: djedAdaPool });
            console.log(`ADA/MIN price: ${a.toString()}; MIN/ADA price: ${b.toString()}`);
            // we can later use this ID to call getPoolById
            console.log(`ADA/MIN pool ID: ${minADAPool.id}`);
            break;
        }
    }

    return Response.json({});
}
