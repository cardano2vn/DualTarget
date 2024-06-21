"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import StatisticsContext from "~/contexts/components/StatisticContext";
import { StatisticsType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { Data, UTxO } from "lucid-cardano";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "../components/NetworkContext";
import { DualtargetDatum } from "~/constants/datum";
import { DECIMAL_PLACES } from "~/constants";

type Props = {
    children: ReactNode;
};

const StatisticsProvider = function ({ children }: Props) {
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);

    const [pool, setPool] = useState<StatisticsType>({
        totalWallet: 0,
        totalUTxO: 0,
        totalADA: 0,
        totalDJED: 0,
        totalProfit: 0,
    });

    const [profit, setprofit] = useState<StatisticsType>({});

    useEffect(() => {
        if (lucidPlatform) {
            (async function () {
                const contractAddress: string =
                    network === "Preprod"
                        ? (process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string)
                        : (process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET! as string);
                const scriptUTxOs: UTxO[] = await lucidPlatform.utxosAt(contractAddress);
                const totalADA: number = scriptUTxOs.reduce(function (balance: number, utxo: UTxO) {
                    return balance + Number(utxo.assets.lovelace) / DECIMAL_PLACES;
                }, 0);

                const wallet = new Set<string>();
                let totalDJED: number = 0;
                for (const scriptUTxO of scriptUTxOs) {
                    if (scriptUTxO.datum) {
                        const outputDatum: any = await Data.from(scriptUTxO.datum!);
                        wallet.add(outputDatum.fields[0]);
                        totalDJED += Number(outputDatum.fields[5]) / DECIMAL_PLACES;
                    }
                }

                const totalProfit: number = scriptUTxOs.reduce(function (
                    balance: number,
                    utxo: UTxO,
                ) {
                    const dattum = Data.from<DualtargetDatum>(utxo?.datum!, DualtargetDatum);
                    return balance + Number(dattum.minimumAmountOutProfit) / DECIMAL_PLACES;
                },
                0);
                console.log(totalProfit);

                setPool(function (prev) {
                    return {
                        ...prev,
                        totalUTxO: scriptUTxOs.length,
                        totalADA: totalADA,
                        totalWallet: wallet.size,
                        totalDJED: totalDJED,
                        totalProfit: totalProfit,
                    };
                });
            })();
        }
    }, [lucidPlatform]);

    return (
        <StatisticsContext.Provider value={{ pool, profit }}>{children}</StatisticsContext.Provider>
    );
};

export default StatisticsProvider;
