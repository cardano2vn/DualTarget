"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Blockfrost, Lucid, Network } from "lucid-cardano";
import LucidContext from "~/contexts/components/LucidContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { networks } from "~/constants/networks";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const [lucid, setLucid] = useState<Lucid>(null!);
    const [loading, setLoading] = useState<boolean>(false);
    const [lucidPlatform, setLucidPlatform] = useState<Lucid>(null!);

    useEffect(() => {
        (async function () {
            setLoading(true);
            const currentNetwork = networks.find(function ({ networkName }) {
                return networkName === network;
            });
            const lucid = await Lucid.new(
                new Blockfrost(currentNetwork?.url as string, currentNetwork?.apiKey as string),
                currentNetwork?.networkName as Network,
            );
            setLucidPlatform(lucid);
            setLoading(false);
        })();
    }, [network]);

    return (
        <LucidContext.Provider value={{ loading, lucid: lucid, setLucid, lucidPlatform }}>
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
