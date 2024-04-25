import React from "react";
import classNames from "classnames/bind";
import styles from "./Gutter.module.scss";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
    children: React.ReactNode;
};

const Gutter = function ({ children, className }: Props) {
    return <div className={cx("wrapper", className)}>{children}</div>;
};

export default Gutter;
