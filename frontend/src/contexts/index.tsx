"use client";

import React, { ReactNode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const SmartContractProvider = lazy(() => import("~/contexts/providers/SmartContractProvider"));
const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));
const ToastProvider = lazy(() => import("~/contexts/providers/ToastProvider"));
const AccountProvider = lazy(() => import("~/contexts/providers/AccountProvider"));
const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));
const TranslateProvider = lazy(() => import("~/contexts/providers/TranslateProvider"));
const StatisticsProvider = lazy(() => import("~/contexts/providers/StatisticsProvider"));
const DelegationRewardProvider = lazy(
    () => import("~/contexts/providers/DelegationRewardProvider"),
);
type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

const ContextProvider = function ({ children }: Props) {
    return (
        <ToastProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <TranslateProvider>
                    <ModalProvider>
                        <NetworkProvider>
                            <LucidProvider>
                                <WalletProvider>
                                    <AccountProvider>
                                        <SmartContractProvider>
                                            <StatisticsProvider>
                                                <DelegationRewardProvider>
                                                    {children}
                                                </DelegationRewardProvider>
                                            </StatisticsProvider>
                                        </SmartContractProvider>
                                    </AccountProvider>
                                </WalletProvider>
                            </LucidProvider>
                        </NetworkProvider>
                    </ModalProvider>
                </TranslateProvider>
            </QueryClientProvider>
        </ToastProvider>
    );
};

export default ContextProvider;
