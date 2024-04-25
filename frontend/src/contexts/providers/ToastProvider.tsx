"use client";

import { ReactNode, useMemo, useState } from "react";
import ToastContext from "~/contexts/components/ToastContext";
import { ToastType } from "~/types/GenericsType";
import icons from "~/assets/icons";

type Props = {
    children: ReactNode;
};

const ToastProvider = function ({ children }: Props) {
    const [toasts, setToasts] = useState<Array<ToastType>>([]);

    const toast = useMemo(
        () => ({
            success: function (message: string) {
                setToasts(function (previous) {
                    return [...previous, { icon: icons.checked, message: message }];
                });
            },
            warn: function (message: string) {
                setToasts(function (previous) {
                    return [...previous, { icon: icons.checked, message: message }];
                });
            },
            error: function (message: string) {
                setToasts(function (previous) {
                    return [...previous, { icon: icons.checked, message: message }];
                });
            },
        }),
        [],
    );

    const value = useMemo(() => ({ toasts, toast }), [toasts, toast]);

    return (
        <ToastContext.Provider
            value={{
                toasts: value.toasts,
                toast: value.toast,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
