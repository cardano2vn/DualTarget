import React, { useContext, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";

const cx = classNames.bind(styles);

type Props = {
    redirect: string;
    name: string;
    isActive: boolean;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderOption = function ({ redirect, name, isActive, setOpen, setSelectedRouter, className }: Props) {
    const handleClickNavItem = function (redirect: string) {
        setSelectedRouter(redirect);
    };

    return (
        <li className={cx("nav-item")}>
            <Link
                onClick={() => {
                    handleClickNavItem(redirect);
                    setOpen && setOpen(false);
                }}
                href={redirect}
                className={cx("nav-item-link", { "nav-item-link-active": isActive }, className)}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderOption;
