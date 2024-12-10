import { Address, Data, Lucid, TxHash, UTxO } from "lucid-cardano";
import { DualtargetDatum } from "~/constants/datum";
import convertInlineDatum from "~/helpers/convert-inline-datum";

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

    const datum = await convertInlineDatum({ inlineDatum: smartcontractUtxo.datum! });
    return {
        assetAda: {
            policyId: datum?.fields[2]?.fields[0]?.bytes,
            assetName: datum?.fields[2]?.fields[1]?.bytes,
        },
        assetOut: {
            policyId: datum?.fields[4]?.fields[0]?.bytes,
            assetName: datum?.fields[4]?.fields[1]?.bytes,
        },
        odStrategy: datum?.fields[9]?.bytes,
        batcherFee: datum?.fields[10]?.int,
        outputADA: datum?.fields[11]?.int,
        feeAddress: datum?.fields[12]?.bytes,
        validatorAddress: datum?.fields[13]?.bytes,
    };
};

export default readDatum;
