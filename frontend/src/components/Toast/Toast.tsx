"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Toast.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { ToastType } from "~/types/GenericsType";

const cx = classNames.bind(styles);

type Props = Omit<ToastType, "id"> & {
    onClose: () => void;
};

const Toast = function ({ icon, message, onClose }: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("icon-container")}>
                    <Image src={icon} alt="" className={cx("icon")} />
                </div>
                <span className={cx("message")}>{message}</span>
                <div className={cx("icon-delete")} onClick={onClose}>
                    <Image src={icons.delete} className={cx("icon-delete-image")} alt="" />
                </div>
            </div>
        </main>
    );
};

export default Toast;
