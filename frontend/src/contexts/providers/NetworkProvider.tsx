"use client";

import { Network } from "lucid-cardano";
import React, { ReactNode, useEffect, useState } from "react";
import enviroments from "~/constants/enviroment";
import NetworkContext from "~/contexts/components/NetworkContext";
import { EnviromentType } from "~/types/GenericsType";
import readEnviroment from "~/utils/read-enviroment";

type Props = {
    children: ReactNode;
};

const NetworkProvider = function ({ children }: Props) {
    const [network, setNetwork] = useState<Network>("Preprod");
    const [enviroment, setEnviroment] = useState<EnviromentType>(enviroments.PREPROD[0]);

    useEffect(() => {
        setEnviroment(
            readEnviroment({
                network: network,
                index: 0,
            }),
        );
    }, [network]);

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
                enviroment,
                setNetwork,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

export default NetworkProvider;
