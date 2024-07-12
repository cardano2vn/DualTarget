"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import StatisticsContext from "~/contexts/components/StatisticContext";
import { StatisticsType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { Address, Data, UTxO } from "lucid-cardano";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "../components/NetworkContext";
import { DualtargetDatum } from "~/constants/datum";
import { DECIMAL_PLACES } from "~/constants";

type Props = {
    children: ReactNode;
};

const StatisticsProvider = function ({ children }: Props) {
    const { enviroment } = useContext<NetworkContextType>(NetworkContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);

    const [pool, setPool] = useState<StatisticsType>({
        totalWallet: 0,
        totalUTxO: 0,
        totalADA: 0,
        totalDJED: 0,
        totalProfit: 0,
        totalVolumeDepositsDJED: 0,
    });

    useEffect(() => {
        if (lucidPlatform) {
            (async function () {
                const contractAddress: Address = enviroment.DUALTARGET_CONTRACT_ADDRESS as Address;
                const scriptUTxOs: UTxO[] = await lucidPlatform.utxosAt(contractAddress);
                const totalADA: number = scriptUTxOs.reduce(function (balance: number, utxo: UTxO) {
                    if (!utxo.scriptRef) {
                        return balance + Number(utxo.assets.lovelace) / DECIMAL_PLACES;
                    }
                    return balance;
                }, 0);

                const wallet = new Set<string>();

                for (const scriptUTxO of scriptUTxOs) {
                    if (scriptUTxO.datum) {
                        const outputDatum: any = await Data.from(scriptUTxO.datum!);
                        wallet.add(outputDatum.fields[0]);
                    }
                }

                const totalDJED: number = scriptUTxOs.reduce(function (
                    balance: number,
                    utxo: UTxO,
                ) {
                    const amount: number = isNaN(Number(utxo?.assets[enviroment.DJED_TOKEN_ASSET!]))
                        ? 0
                        : Number(Number(utxo?.assets[enviroment.DJED_TOKEN_ASSET!]));
                    return balance + amount / DECIMAL_PLACES;
                },
                0);

                const totalProfit: number = scriptUTxOs.reduce(function (
                    balance: number,
                    utxo: UTxO,
                ) {
                    const datum = Data.from<DualtargetDatum>(utxo?.datum!, DualtargetDatum);
                    if (Number(datum.isLimitOrder) === 0) {
                        const amount: number = isNaN(
                            Number(utxo?.assets[enviroment.DJED_TOKEN_ASSET!]),
                        )
                            ? 0
                            : Number(Number(utxo?.assets[enviroment.DJED_TOKEN_ASSET!]));
                        return balance + amount / DECIMAL_PLACES;
                    }

                    return balance;
                },
                0);

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

    return <StatisticsContext.Provider value={{ pool }}>{children}</StatisticsContext.Provider>;
};

export default StatisticsProvider;
