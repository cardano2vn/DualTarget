import classNames from "classnames/bind";
import React from "react";
import styles from "./Service.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import Tippy from "~/components/Tippy";
const cx = classNames.bind(styles);

type Props = {
    balance?: number;
    cost?: number;
    fees?: number;
    currency?: string;
    minimalADArequirement?: number;
    className?: string;
    min?: number;
    max?: number;
    type: "PAY" | "GET";
};

const Service = function ({ type }: Props) {
    return (
        <div className="service">
            <div className={cx("balance")}>
                <span>Balance: 0 ₳</span>
            </div>
            <form className={cx("form")}>
                <section className={cx("search")}>
                    <div className={cx("search-input")}>
                        <input type="text" placeholder="Enter SHEN amount (Min: 200)" />
                    </div>
                </section>
            </form>

            <form className={cx("form")}>
                <section className={cx("search")}>
                    <div className={cx("search-input")}>
                        <input type="text" placeholder="Enter SHEN amount (Min: 200)" />
                    </div>
                </section>
            </form>

            <div className={cx("info")}>
                <div className={cx("service-stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Cost</span>
                        <Tippy render={<div>Amount includes a 1.5% mint fee</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Fees</span>
                        <Tippy
                            render={
                                <div>
                                    <div className={cx("stats-fee")}>
                                        <span>Request Fee</span>
                                        <span>-</span>
                                    </div>
                                    <div className={cx("stats-fee")}>
                                        <span>Operator Fee</span>
                                        <span>-</span>
                                    </div>
                                </div>
                            }
                        >
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>{type === "PAY" ? <span>You will pay</span> : <span>You will get</span>}</div>-
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Minimal ADA requirement</span>
                        <Tippy
                            placement="top"
                            render={
                                <div>
                                    This amount will be reimbursed once the order is processed, irrespective of whether the order is a success or not.
                                    <a
                                        className={cx("tippy-content-link")}
                                        href="https://docs.cardano.org/native-tokens/minimum-ada-value-requirement/"
                                        target="_blank"
                                    >
                                        Why is it required?
                                    </a>
                                </div>
                            }
                        >
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
            </div>
        </div>
    );
};

export default Service;
