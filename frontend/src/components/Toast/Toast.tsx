"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Toast.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { ToastType } from "~/types/GenericsType";

const cx = classNames.bind(styles);

type Props = ToastType;

const Toast = function ({ icon, message }: Props) {
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {
        console.log(message);
        if (message) {
            setIsShow(!isShow);

            const handler = setTimeout(() => setIsShow(!isShow), 10000);

            return () => clearInterval(handler);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    return (
        <main className={cx("wrapper", { isShow: isShow })}>
            <div className={cx("container")}>
                <div className={cx("icon-container")}>
                    <Image src={icon} alt="" className={cx("icon")} />
                </div>
                <span className={cx("message")}>{message}</span>
                <div className={cx("icon-delete")} onClick={() => setIsShow(!isShow)}>
                    <Image src={icons.delete} className={cx("icon-delete-image")} alt="" />
                </div>
            </div>
        </main>
    );
};

export default Toast;
