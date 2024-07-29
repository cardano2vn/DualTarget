import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { PublicLayout } from "~/layouts";

export const metadata: Metadata = {
    title: "Dualtarget",
    description:
        "Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot",
};

type Props = {
    children: ReactNode;
};

const RootPublic = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <PublicLayout>{children}</PublicLayout>
            </body>
        </html>
    );
};

export default RootPublic;
