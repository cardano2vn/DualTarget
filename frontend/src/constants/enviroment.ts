const enviroments = {
    MAINNET: [
        {
            NAME: process.env.BLOCKFROST_NETWORK_NAME_MAINNET as string,
            BLOCKFROST_RPC_URL: process.env.BLOCKFROST_RPC_URL_MAINNET as string,
            BLOCKFROST_PROJECT_API_KEY: process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET as string,
            KOIOS_RPC_URL: process.env.KOIOS_RPC_URL_MAINNET as string,
            DUALTARGET_CONTRACT_ADDRESS: process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET as string,
            DUALTARGET_PAYMENT_ADDRESS: process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET as string,
            DUALTARGET_STAKE_ADDRESS: process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET as string,
            EXCHANGE_ADDRESS_FREE: process.env.EXCHANGE_ADDRESS_FREE_MAINNET as string,
            HADA_POOL_ID: process.env.POOL_ID_MAINNET as string,
            DUALTARGET_TXHASH_REFERENCE_SCRIPT: process.env
                .DUALTARGET_TXHASH_REFRENCE_SCRIPT_MAINNET as string,
            DJED_TOKEN_ASSET: process.env.DJED_TOKEN_ASSET_MAINNET as string,
        },
    ],

    PREPROD: [
        {
            NAME: process.env.BLOCKFROST_NETWORK_NAME_PREPROD as string,
            BLOCKFROST_RPC_URL: process.env.BLOCKFROST_RPC_URL_PREPROD as string,
            BLOCKFROST_PROJECT_API_KEY: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string,
            KOIOS_RPC_URL: process.env.KOIOS_RPC_URL_PREPROD as string,
            DUALTARGET_CONTRACT_ADDRESS: process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD as string,
            DUALTARGET_PAYMENT_ADDRESS: process.env.DUALTARGET_PAYMENT_ADDRESS_PREPROD as string,
            DUALTARGET_STAKE_ADDRESS: process.env.DUALTARGET_STAKE_ADDRESS_PREPROD as string,
            EXCHANGE_ADDRESS_FREE: process.env.EXCHANGE_ADDRESS_FREE_PREPROP as string,
            HADA_POOL_ID: process.env.POOL_ID_PREPROD as string,
            DUALTARGET_TXHASH_REFERENCE_SCRIPT: process.env
                .DUALTARGET_TXHASH_REFRENCE_SCRIPT_PREPROD as string,
            DJED_TOKEN_ASSET: process.env.DJED_TOKEN_ASSET_PREPROD as string,
        },
    ],
};

export default enviroments;
