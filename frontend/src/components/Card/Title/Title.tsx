import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const cx = classNames.bind(styles);

type Props = {
    icon: string | StaticImport;
    title: string;
    className?: string;
};

const Title = function ({ title, className, icon }: Props) {
    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("icon-wrapper")}>
                <div className={cx("icon-frame")} />
                <Image src={icon} alt={title} className={cx("icon")} />
            </div>
            <span className={cx("title")}>{title}</span>
        </div>
    );
};

export default Title;
