"use client";

import React, { ReactNode, useContext, useState, useEffect } from "react";
import WalletContext from "~/contexts/components/WalletContext";
import { WalletType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { Blockfrost, Lucid, Network, UTxO } from "lucid-cardano";
import wallets from "~/constants/wallets";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { networks } from "~/constants/networks";
import checkNetwork from "~/helpers/check-network";
import { ModalContextType } from "~/types/contexts/ModalContextType";
import ModalContext from "../components/ModalContext";
import { ToastContextType } from "~/types/contexts/ToastContextType";
import ToastContext from "../components/ToastContext";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const { lucid, setLucid } = useContext<LucidContextType>(LucidContext);
    const { toogleErrorNetwork, isShowingErrorNetwork, isShowingWallet, toggleShowingWallet, isShowingTestNetwork, toggleTestNetwork } =
        useContext<ModalContextType>(ModalContext);
    const { toast } = useContext<ToastContextType>(ToastContext);
    const [wallet, setWallet] = useState<WalletType>(null!);
    const [loading, setLoading] = useState<boolean>(false);
    const { network } = useContext<NetworkContextType>(NetworkContext);

    useEffect(() => {
        const walletConnecttion = localStorage.getItem("wallet");
        if (walletConnecttion) {
            const walletConnected = JSON.parse(walletConnecttion);
            wallets.forEach(async function (wallet) {
                if (wallet.name.toLowerCase() === walletConnected.name) {
                    await connect({
                        name: wallet.name,
                        api: wallet.api,
                        checkApi: wallet.checkApi,
                        image: wallet.image,
                    });
                    return;
                }
            });
        }
        //  react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (wallet) {
            localStorage.setItem(
                "wallet",
                JSON.stringify({
                    name: wallet.name.toLowerCase(),
                    connectedAt: new Date().getTime(),
                }),
            );
        }
        // react-hooks/exhaustive-deps
    }, [wallet]);

    const connect = async function ({ name, api, image }: WalletType) {
        try {
            setLoading(true);
            const currentNetwork = networks.find(function ({ networkName }) {
                return networkName === network;
            });

            const lucid = await Lucid.new(
                new Blockfrost(currentNetwork?.url as string, currentNetwork?.apiKey as string),
                currentNetwork?.networkName as Network,
            );

            lucid.selectWallet(await api());
            const address: string = (await lucid.wallet.address()) as string;
            const networkConnection: Network = checkNetwork({ address: address as string, pattern: "test" });
            if (networkConnection !== network && !isShowingErrorNetwork) {
                toggleShowingWallet();
                toogleErrorNetwork();
                return;
            }

            if (network === "Preprod" && !isShowingTestNetwork) {
                toggleTestNetwork();
            }

            const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = (await lucid.wallet.getUtxos()) as Array<UTxO>;
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (balance: number, utxo: UTxO) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    name: name,
                    image: image,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
            setLucid(lucid);
            toast.success("Wallet connected !");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const disconnect = async function () {
        try {
            setWallet(null!);
            setLucid(null!);
            if (isShowingErrorNetwork) {
                toogleErrorNetwork();
            }

            localStorage.removeItem("wallet");
        } catch (error) {
            console.log(error);
        }
    };

    const refresh = async function () {
        try {
            setLoading(true);
            const address: string = await lucid.wallet.address();
            const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return <WalletContext.Provider value={{ connect, wallet, disconnect, refresh, loading }}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
