import { Address, Data, Lucid, TxHash, UTxO } from "lucid-cardano";
import { DualtargetDatum } from "~/constants/datum";

type Props = {
    lucid: Lucid;
    txHashRef: TxHash;
    contractAddress: string;
};

export type ReadDatumType = {};

const readDatum = async function ({ contractAddress, txHashRef, lucid }: Props) {
    const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress as Address);

    const smartcontractUtxo: UTxO | undefined = scriptUtxos.find(function (scriptUtxo) {
        return scriptUtxo.scriptRef?.script && scriptUtxo.txHash === txHashRef;
    });

    if (!smartcontractUtxo) throw new Error("Cound not find smart contract utxo");

    const datum = Data.from<DualtargetDatum>(smartcontractUtxo.datum!, DualtargetDatum);
    return {
        assetAda: {
            policyId: datum.assetADA.policyId,
            assetName: datum.assetADA.assetName,
        },
        assetOut: {
            policyId: datum.assetOut.policyId,
            assetName: datum.assetOut.assetName,
        },
        odStrategy: datum.odStrategy,
        batcherFee: datum.batcherFee,
        outputADA: datum.outputADA,
        feeAddress: datum.feeAddress,
        validatorAddress: datum.validatorAddress,
    };
};

export default readDatum;
