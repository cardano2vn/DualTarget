"use client";

import React, { ReactNode } from "react";
import ModalContext from "~/contexts/components/ModalContext";
import { useModal } from "~/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingWallet, toggle: toggleShowingWallet } = useModal();
    const { isShowing: isShowingTestNetwork, toggle: toggleTestNetwork } = useModal();
    const { isShowing: isShowingErrorNetwork, toggle: toogleErrorNetwork } = useModal();
    const { isShowing: isShowingSidebar, toggle: toggleShowingSidebar } = useModal();
    return (
        <ModalContext.Provider
            value={{
                isShowingSidebar,
                toggleShowingSidebar,
                isShowingErrorNetwork,
                toogleErrorNetwork,
                isShowingWallet,
                toggleShowingWallet,
                isShowingTestNetwork,
                toggleTestNetwork,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
