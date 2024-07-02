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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
    children: ReactNode;
};

const StatisticsProvider = function ({ children }: Props) {
    const { network, enviroment } = useContext<NetworkContextType>(NetworkContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);

    const [pool, setPool] = useState<StatisticsType>({
        totalWallet: 0,
        totalUTxO: 0,
        totalADA: 0,
        totalDJED: 0,
        totalProfit: 0,
        totalVolumnProfits: 0,
        profitMargin: 0,
    });

    // const [profit, setprofit] = useState<StatisticsType>({});

    useEffect(() => {
        if (lucidPlatform) {
            (async function () {
                const contractAddress: Address = enviroment.DUALTARGET_CONTRACT_ADDRESS as Address;
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

    const { data: poolHistory } = useQuery({
        queryKey: ["Pools"],
        queryFn: () =>
            axios.get<string[]>(
                `${window.location.origin}/api/pool?network=${network.toLowerCase()}`,
                {
                    timeout: 5000,
                },
            ),
        enabled: true,
    });
    useEffect(() => {
        const datums = poolHistory?.data?.map(function (data: string) {
            return Data.from<DualtargetDatum>(data!, DualtargetDatum);
        });

        const totalVolumnProfits: number | undefined = datums?.reduce(function (
            balance: number,
            amount: DualtargetDatum,
        ) {
            return balance + Number(amount.minimumAmountOutProfit) / DECIMAL_PLACES;
        },
        0);
        const profitMargin = datums?.reduce(function (balance: number, amount: DualtargetDatum) {
            if (Number(amount.isLimitOrder) === 0) {
                return balance + Number(amount.minimumAmountOutProfit) / DECIMAL_PLACES;
            }

            return balance;
        }, 0);

        console.log(profitMargin, totalVolumnProfits);

        setPool(function (previous) {
            return {
                ...previous,
                totalVolumnProfits: totalVolumnProfits,
                profitMargin: profitMargin,
            };
        });
    }, [poolHistory]);

    return <StatisticsContext.Provider value={{ pool }}>{children}</StatisticsContext.Provider>;
};

export default StatisticsProvider;
