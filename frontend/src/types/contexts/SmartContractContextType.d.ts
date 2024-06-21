import { CalculateSellingStrategy, ClaimableUTxO } from "~/types/GenericsType";

export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    waitingCalculateEUTxO: boolean;
    previewWithdraw: ({
        lucid,
        range,
    }: {
        lucid: Lucid;
        range: [number, number];
    }) => Promise<CalculateSellingStrategy[]>;
    previewDeposit: ({
        sellingStrategies,
        currentPrice,
    }: {
        sellingStrategies: Array<CalculateSellingStrategy>;
        currentPrice: number;
    }) => {
        amountADA: number;
        amountDJED: number;
    };
    calculateClaimEUTxO: ({
        lucid,
        mode,
    }: {
        lucid: Lucid;
        mode: number;
        min: number;
        max: number;
    }) => Promise<ClaimableUTxO[]>;
    deposit: ({
        lucid,
        sellingStrategies,
        currentPrice,
    }: {
        lucid: Lucid;
        sellingStrategies: CalculateSellingStrategy[];
        currentPrice: number;
    }) => Promise<void>;
    withdraw: ({
        lucid,
        claimableUtxos,
    }: {
        lucid: Lucid;
        claimableUtxos: Array<ClaimableUTxO>;
    }) => Promise<void>;
};
