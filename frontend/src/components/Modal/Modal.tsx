"use client";
import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
    toggle: () => void;
    isShowing: boolean;
    transparent?: boolean;
};

const Modal = function ({ toggle, children, isShowing, transparent }: Props) {
    if (!isShowing) return;

    return (
        <main className={cx("wrapper")}>
            <section className={cx("modal")} onClick={toggle} />
            {children}
        </main>
    );
};

export default Modal;
