import classNames from "classnames/bind";
import React from "react";
import styles from "./Coin.module.scss";
import CountUp from "react-countup";
import Loading from "~/components/Loading";

const cx = classNames.bind(styles);

type Props = {
    title?: string;
    amount?: number;
    denominations?: string;
    className?: string;
    loading?: boolean;
    decimals?: number;
};

const Coin = function ({ className, title, amount, denominations, loading, decimals = 6 }: Props) {
    return (
        <div className={cx("body", className)}>
            <div className={cx("buy-price")}>
                <h2 className={cx("title")}>{title}</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <div className={cx("amount")}>
                        <span>
                            <CountUp start={0} end={Number(amount!)} decimals={decimals} />
                        </span>
                        <span className={cx("suffix")}>{denominations}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Coin;
