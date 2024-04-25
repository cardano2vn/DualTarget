import { DelegationRewardType, TransactionHistoryType } from "~/types/GenericsType";

export const convertNumberToSocialType = (number: number) => new Intl.NumberFormat().format(number);

export const convertTimestampToDateObject = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export const isTransactionHistoryType = (data: TransactionHistoryType[] | DelegationRewardType[]): data is TransactionHistoryType[] => {
    const item = data[0];
    return Array.isArray(data) && "blockTime" in item && "txHash" in item && "fee" in item;
};
