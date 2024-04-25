"use client";

import { Network } from "lucid-cardano";
import React, { ReactNode, useEffect, useState } from "react";
import NetworkContext from "~/contexts/components/NetworkContext";

type Props = {
    children: ReactNode;
};

const NetworkProvider = function ({ children }: Props) {
    const [network, setNetwork] = useState<Network>("Preprod");

    useEffect(() => {
        const networkConnection = localStorage.getItem("network");
        if (networkConnection) {
            setNetwork(JSON.parse(networkConnection));
        }
    }, []);

    useEffect(() => {
        if (network) {
            localStorage.setItem("network", JSON.stringify(network));
        }
    }, [network]);

    return (
        <NetworkContext.Provider
            value={{
                network,
                setNetwork,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

export default NetworkProvider;
