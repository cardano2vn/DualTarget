import classNames from "classnames/bind";
import React from "react";
import styles from "./TippyWrapper.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
    className?: string;
};

const TippyWrapper = function ({ children, className }: Props) {
    return <div className={cx("wrapper", className)}>{children}</div>;
};

export default TippyWrapper;
