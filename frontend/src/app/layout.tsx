import "./globals.scss";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import ContextProvider from "~/contexts";
import { PublicLayout } from "~/layouts";
import NetworkConnectionStatus from "~/components/NetworkConnectionStatus";

export const metadata: Metadata = {
    title: "Dualtarget",
    description: "Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot",
};

type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    <PublicLayout>{children}</PublicLayout>
                    {/* <NetworkConnectionStatus /> */}
                </ContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
