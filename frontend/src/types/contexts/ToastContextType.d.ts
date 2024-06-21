import { ToastType } from "../GenericsType";

export type ToastFuncArgsType = Omit<ToastType, "id">;

export type ToastContextType = {
    toasts: ToastType[];
    removeToast: (id: string) => void;
    toast: {
        success: (params: ToastFuncArgsType) => void;
        warn: (params: ToastFuncArgsType) => void;
        error: (params: ToastFuncArgsType) => void;
    };
};
