import { Data } from "lucid-cardano";

const DualtargetDatumSchema = Data.Object({
    odOwner: Data.Bytes(),
    odBeneficiary: Data.Bytes(),
    assetADA: Data.Object({
        policyId: Data.Bytes(),
        assetName: Data.Bytes(),
    }),
    amountADA: Data.Integer(),
    assetOut: Data.Object({
        policyId: Data.Bytes(),
        assetName: Data.Bytes(),
    }),
    minimumAmountOut: Data.Integer(),
    minimumAmountOutProfit: Data.Integer(),
    buyPrice: Data.Integer(),
    sellPrice: Data.Integer(),
    odStrategy: Data.Bytes(),
    batcherFee: Data.Integer(),
    outputADA: Data.Integer(),
    feeAddress: Data.Bytes(),
    validatorAddress: Data.Bytes(),
    deadline: Data.Integer(),
    isLimitOrder: Data.Integer(),
});

export type DualtargetDatum = Data.Static<typeof DualtargetDatumSchema>;
export const DualtargetDatum = DualtargetDatumSchema as unknown as DualtargetDatum;
