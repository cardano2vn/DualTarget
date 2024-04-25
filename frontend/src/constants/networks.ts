import { NetworkType } from "~/types/GenericsType";

const networks: NetworkType[] = [
    {
        networkName: "Mainnet",
        url: process.env.BLOCKFROST_RPC_URL_MAINNET!,
        apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!,
    },
    {
        networkName: "Preprod",
        url: process.env.BLOCKFROST_RPC_URL_PREPROD!,
        apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
    },
    // {
    //     networkName: "Preview",
    //     url: process.env.BLOCKFROST_RPC_URL_PREVIEW!,
    //     apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_PREVIEW!,
    // },
];

export { networks };
