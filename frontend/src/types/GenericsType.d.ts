import { Network, TxHash, UTxO } from "lucid-cardano";

export type DelegationRewardType = {
    epoch: number;
    amount: number;
    rewards: number;
    status: string;
};

export type EnviromentType = {
    NAME: string;
    BLOCKFROST_RPC_URL: string;
    BLOCKFROST_PROJECT_API_KEY: string;
    KOIOS_RPC_URL: string;
    DUALTARGET_CONTRACT_ADDRESS: string;
    DUALTARGET_PAYMENT_ADDRESS: string;
    DUALTARGET_STAKE_ADDRESS: string;
    EXCHANGE_ADDRESS_FREE: string;
    HADA_POOL_ID: string;
    DUALTARGET_TXHASH_REFERENCE_SCRIPT: string;
    DJED_TOKEN_ASSET: string;
};

export type DelegationRewardResponseType = {
    totalPage: number;
    histories: DelegationRewardType[];
    totalItems: number;
};

export type StatisticsType = {
    totalWallet?: number;
    totalUTxO?: number;
    totalADA?: number;
    totalDJED?: number;
    totalProfit?: number;

    totalTransaction?: number;
    totalVolumeWithdrawsDJED?: number;
    totalVolumeWithdrawsADA?: number;
    totalVolumeDepositsADA?: number;
    totalVolumeDepositsDJED?: number;

    profitMargin?: number;
    adaMargin?: number;
    djedMargin?: number;
};

export type CalculateRewardType = {
    index: number;
    epoch: number;
    address: string;
    amount: number;
    reward: number;
    status: string;
};

export type TransactionHistoryType = {
    type: string;
    txHash: string;
    amountADA: number;
    amountDJED: number;
    status: string;
    fee: number;
    blockTime: string;
};

export type TransactionResponseType = {
    totalPage: number;
    histories: TransactionHistoryType[];
    totalItems: number;
};

export type ToastType = {
    icon?: string | any;
    message?: string;
    duration?: number;
    id: string;
};

export type AccountType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    walletAddress: string;
    stakeAddress: string;
};

export type WalletType = {
    name: string;
    image: string;
    djed?: number;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type NetworkType = {
    networkName: Network;
    url: string;
    apiKey: string;
};

export type HeaderTableType = {
    title: string;
    description?: string;
};

export type TransactionType = {
    id?: string;
    tx_hash: string;
    created_at?: string;
    updated_at?: string;

    date: string;
    action: string;
    amount: string;
    status: string;
    account_id: string;
};

// test
export interface DaultargetParams {
    odOwner: Uint8Array;
    odBeneficiary: Uint8Array;
    assetA: string;
    amountA: number;
    assetOut: string;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    buyPrice: number;
    sellPrice: number;
    odstrategy: string;
    BatcherFee: number;
    OutputADA: number;
    fee_address: Uint8Array;
    validator_address: Uint8Array;
    deadline: number;
    isLimitOrder: number;
}

export type CalculateSellingStrategy = {
    buyPrice?: number;
    sellPrice?: number;
    amountSend?: number;
    minimumAmountOut?: number;
    minimumAmountOutProfit?: number;
    amountSell?: number;
    amountBuy?: number;
    amountEntry?: number;
    USDTPool?: number;
    sumADA?: number;
};

export interface ClaimableUTxO {
    utxo: UTxO;
    BatcherFee_addr: string;
    fee: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    isLimitOrder?: number;
}

export type ChartHistoryRecord = {
    close: string;
    closeTime: number;
    high: string;
    ignored: string;
    low: string;
    open: string;
    openTime: number;
    quoteAssetVolume: string;
    takerBaseAssetVolume: string;
    takerQuoteAssetVolume: string;
    trades: number;
    volume: string;
};

export type ChartDataType = [number, number][];
