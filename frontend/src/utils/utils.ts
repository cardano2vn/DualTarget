import {
    CalculateRewardType,
    DelegationRewardType,
    TransactionHistoryType,
} from "~/types/GenericsType";

export const convertNumberToSocialType = (number: number) => new Intl.NumberFormat().format(number);

export const convertTimestampToDateObject = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export const isTransactionHistoryType = (
    data: TransactionHistoryType[] | DelegationRewardType[] | CalculateRewardType[],
): data is TransactionHistoryType[] => {
    const item = data[0];
    return Array.isArray(data) && "blockTime" in item && "txHash" in item;
};

export const isRewardCalculateType = function (
    data: TransactionHistoryType[] | DelegationRewardType[] | CalculateRewardType[],
): data is CalculateRewardType[] {
    const item = data[0];
    return Array.isArray(data) && "address" in item;
};

export function isValidCardanoWalletAddress(walletAddress: string) {
    const patterns = /^(addr1|addr_test1)[a-z0-9]+/;

    if (!patterns.test(walletAddress) || walletAddress.length < 100 || walletAddress.length > 150)
        return false;

    return true;
}
