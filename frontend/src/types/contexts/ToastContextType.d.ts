import { ToastType } from "../GenericsType";

export type ToastContextType = {
    toasts: ToastType[];

    toast: {
        success: (message: string) => void;
        warn: (message: string) => void;
        error: (message: string) => void;
    };
};
