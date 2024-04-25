"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import StatisticsContext from "~/contexts/components/StatisticContext";
import { StatisticsType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { Data, UTxO } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const StatisticsProvider = function ({ children }: Props) {
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);

    const [pool, setPool] = useState<StatisticsType>({
        totalWallet: 0,
        totalUTxO: 0,
        totalADA: 0,
        totalDJED: 0,
    });

    const [profit, setprofit] = useState<StatisticsType>({});

    useEffect(() => {
        if (lucidPlatform) {
            (async function () {
                const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
                const scriptUTxOs: UTxO[] = await lucidPlatform.utxosAt(contractAddress);

                const totalADA: number = scriptUTxOs.reduce(function (balance: number, utxo: UTxO) {
                    return balance + Number(utxo.assets.lovelace) / 1000000;
                }, 0);

                const wallet = new Set<string>();
                let totalDJED: number = 0;
                for (const scriptUTxO of scriptUTxOs) {
                    if (scriptUTxO.datum) {
                        const outputDatum: any = await Data.from(scriptUTxO.datum!);
                        wallet.add(outputDatum.fields[0]);
                        totalDJED += Number(outputDatum.fields[5]) / 1000000;
                    }
                }

                setPool(function (prev) {
                    return {
                        ...prev,
                        totalUTxO: scriptUTxOs.length,
                        totalADA: totalADA,
                        totalWallet: wallet.size,
                        totalDJED: totalDJED,
                    };
                });
            })();
        }
    }, [lucidPlatform]);

    return <StatisticsContext.Provider value={{ pool, profit }}>{children}</StatisticsContext.Provider>;
};

export default StatisticsProvider;
