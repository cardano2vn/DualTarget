import classNames from "classnames/bind";
import React from "react";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const Loading = function ({ className }: Props) {
    return <span className={cx("spinner-stat", className)} />;
};

export default Loading;
