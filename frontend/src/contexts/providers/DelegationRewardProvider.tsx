"use client";

import React, { ReactNode } from "react";
import DelegationRewardContext from "../components/DelegationRewardContext";
import { Data, Lucid, UTxO } from "lucid-cardano";
import { DualtargetDatum } from "~/constants/datum";
import { DECIMAL_PLACES } from "~/constants";
import { EnviromentType } from "~/types/GenericsType";

type Props = {
    children: ReactNode;
};

const DelegationRewardProvider = function ({ children }: Props) {
    const caculateADAPool = async function ({
        walletAddress,
        lucidPlatform,
        enviroment,
    }: {
        walletAddress: string;
        lucidPlatform: Lucid;
        enviroment: EnviromentType;
    }): Promise<number> {
        const paymentAddress: string = lucidPlatform?.utils.getAddressDetails(walletAddress)
            .paymentCredential?.hash as string;
        const contractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS;
        const scriptUtxos: UTxO[] = await lucidPlatform?.utxosAt(contractAddress);

        return scriptUtxos?.reduce(function (balance: number, scriptUtxo: UTxO) {
            const dualtargetDatum = Data.from<DualtargetDatum>(scriptUtxo.datum!, DualtargetDatum);
            if (dualtargetDatum.odOwner === paymentAddress && !scriptUtxo.scriptRef) {
                return balance + Number(scriptUtxo.assets.lovelace) / DECIMAL_PLACES;
            }
            return balance;
        }, 0);
    };

    return (
        <DelegationRewardContext.Provider value={{ caculateADAPool }}>
            {children}
        </DelegationRewardContext.Provider>
    );
};

export default DelegationRewardProvider;
