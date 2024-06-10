const env = {
    MAINNET: [
        {
            NAME: process.env.BLOCKFROST_NETWORK_NAME_MAINNET,
            BLOCKFROST_RPC_URL: process.env.BLOCKFROST_RPC_URL_MAINNET,
            BLOCKFROST_PROJECT_API_KEY: process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET,
            KOIOS_RPC_URL: process.env.KOIOS_RPC_URL_MAINNET,
            DUALTARGET_CONTRACT_ADDRESS: "",
            DUALTARGET_PAYMENT_ADDRESS: "",
            DUALTARGET_STAKE_ADDRESS: "",
            DUALTARGET_TXHASH: "",
            HADA_POOL_ID: "",
        },
    ],

    PREPROD: [
        {
            NAME: "Preprod",
            BLOCKFROST_RPC_URL: "https://cardano-mainnet.blockfrost.io/api/v0",
            BLOCKFROST_PROJECT_API_KEY: "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC",
            KOIOS_RPC_URL: "https://api.koios.rest/api/v1",
            DUALTARGET_CONTRACT_ADDRESS: "",
            DUALTARGET_PAYMENT_ADDRESS: "",
            DUALTARGET_STAKE_ADDRESS: "",
            DUALTARGET_TX_HASH: "",
            HADA_POOL_ID: "",
        },
    ],
};

export default env;
