"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./ToastList.module.scss";
import Toast from "../Toast/Toast";
import { ToastType } from "~/types/GenericsType";
import { createPortal } from "react-dom";
const cx = classNames.bind(styles);

type Props = {
    data: ToastType[];
    removeToast: (id: string) => void;
};

function ToastList({ data: toasts, removeToast }: Props) {
    return (
        toasts.length > 0 &&
        createPortal(
            <div className={cx("toast-list")} aria-live="assertive">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>,
            document.body,
        )
    );
}

export default ToastList;
