"use client";

import React, { ReactNode, useContext, useState } from "react";
import AccountContext from "~/contexts/components/AccountContext";
import { useQuery } from "@tanstack/react-query";
import { post } from "~/utils/http-requests";
import WalletContext from "../components/WalletContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import { AccountType } from "~/types/GenericsType";
type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const [account, setAccount] = useState<AccountType>(null!);
    const { data, isLoading, error } = useQuery({
        queryKey: ["account"],
        queryFn: async function () {
            return await post("/account", {
                wallet_address: wallet.address,
            });
        },
        enabled: !Boolean(wallet?.address),
    });

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
