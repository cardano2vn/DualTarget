"use client";
import { nanoid } from "nanoid";
import { ReactNode, useEffect, useRef, useState } from "react";
import ToastContext from "~/contexts/components/ToastContext";
import { ToastType } from "~/types/GenericsType";
import icons from "~/assets/icons";
import { ToastFuncArgsType } from "~/types/contexts/ToastContextType";
import ToastList from "~/components/ToastList/ToastList";

type Props = {
    children: ReactNode;
};

const ToastProvider = function ({ children }: Props) {
    const [toasts, setToasts] = useState<Array<ToastType>>([]);
    const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
    const toast = {
        success({ message, duration = 3000 }: ToastFuncArgsType) {
            setToasts((previous) => [
                ...previous,
                { id: nanoid(), icon: icons.checked, message: message, duration },
            ]);
        },
        warn({ message, duration = 3000 }: ToastFuncArgsType) {
            setToasts((previous) => [
                ...previous,
                { id: nanoid(), icon: icons.checked, message: message, duration },
            ]);
        },
        error({ message, duration = 3000 }: ToastFuncArgsType) {
            setToasts((previous) => [
                ...previous,
                { id: nanoid(), icon: icons.checked, message: message, duration },
            ]);
        },
    };

    const removeToast = (id: string) => {
        const newToastList = toasts.filter((toast) => toast.id !== id);
        setToasts(newToastList);
    };

    useEffect(() => {
        timeoutIdsRef.current.forEach(clearTimeout);
        timeoutIdsRef.current = [];
        toasts.forEach((toast) => {
            const timeoutId = setTimeout(() => {
                const restToast = toasts.slice(1);
                setToasts(restToast);
            }, toast.duration);
            timeoutIdsRef.current.push(timeoutId);
        });
    }, [toasts]);

    return (
        <ToastContext.Provider
            value={{
                toasts: toasts,
                toast: toast,
                removeToast,
            }}
        >
            {children}
            <ToastList removeToast={removeToast} data={toasts} />
        </ToastContext.Provider>
    );
};

export default ToastProvider;
