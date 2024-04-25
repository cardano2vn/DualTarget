import { Address, Data, Lucid, UTxO } from "lucid-cardano";
import { DualtargetDatum } from "~/constants/datum";

type Props = {
    lucid: Lucid;
    contractAddress: string;
};

export type ReadDatumType = {};

const readDatum = async function ({ contractAddress, lucid }: Props) {
    const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress as Address);

    const smartcontractUtxo: UTxO | undefined = scriptUtxos.find(function (scriptUtxo) {
        return scriptUtxo.scriptRef?.script;
    });

    if (!smartcontractUtxo) throw new Error("Cound not find smart contract utxo");

    const datum: any = Data.from(smartcontractUtxo.datum!);
    return {
        assetAda: {
            policyId: datum.fields[2].fields[0],
            assetName: datum.fields[2].fields[1],
        },
        assetOut: {
            policyId: datum.fields[4].fields[0],
            assetName: datum.fields[4].fields[0],
        },
        odStrategy: datum.fields[9],
        batcherFee: datum.fields[10],
        outputADA: datum.fields[11],
        feeAddress: datum.fields[12],
        validatorAddress: datum.fields[13],
    };
};

export default readDatum;
