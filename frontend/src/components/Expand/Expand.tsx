import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Expand.module.scss";
import { TransactionHistoryType } from "~/types/GenericsType";
import Link from "next/link";

type Props = {
    className?: string;
    data: TransactionHistoryType;
};

const cx = classNames.bind(styles);

const Expand = function ({ className, data }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleActiveAccordion = () => {
        setToggle((prev) => !prev);
    };

    return (
        <div className={cx("wrapper")} onClick={handleActiveAccordion}>
            <div>
                <header className={cx("header", className)}>
                    <span className={cx("action-type")}>{data.type}</span>
                    {data.amountADA} ₳
                    <div
                        className={cx("icon", {
                            active: toggle,
                        })}
                    />
                </header>
                <div
                    className={cx("expanded-content", {
                        active: toggle,
                    })}
                >
                    <div className={cx("left-content")}>
                        <div className={cx("date")}>
                            <div className={cx("title-wrapper")}>
                                <span>Date</span>
                            </div>
                            <div className={cx("value")}>{data.blockTime}</div>
                        </div>
                        <div className={cx("tx-hash")}>
                            <div className={cx("title-wrapper")}>
                                <span>Tx hash</span>
                            </div>
                            <div className={cx("value")}>
                                <Link
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://preprod.cardanoscan.io/transaction/${data.txHash}`}
                                    className={cx("link")}
                                >
                                    {data.txHash}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={cx("right-content")}>
                        <div className={cx("received-or-payed")}>
                            <div className={cx("title-wrapper")}>
                                <span>Fee</span>
                            </div>
                            <div className={cx("value")}>{data.fee} ₳</div>
                        </div>
                        <div className={cx("status")}>
                            <div className={"title-wrapper"}>
                                <span>Status</span>
                            </div>
                            <div className={cx("value")}>{data.status}</div>
                        </div>
                    </div>
                    <div className={cx("right-content")}>
                        <div className={cx("status")}>
                            <div className={"title-wrapper"}>
                                <span>Amount DJED</span>
                            </div>
                            <div className={cx("value")}>{data.amountDJED}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expand;
