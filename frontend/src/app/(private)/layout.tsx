import React, { ReactNode } from "react";
import type { Metadata } from "next";
import PrivateLayout from "~/layouts/PrivateLayout";

export const metadata: Metadata = {
    title: "Dualtarget",
    description:
        "Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot",
};

type Props = {
    children: ReactNode;
};

const RootPrivate = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <PrivateLayout>{children}</PrivateLayout>
            </body>
        </html>
    );
};

export default RootPrivate;
