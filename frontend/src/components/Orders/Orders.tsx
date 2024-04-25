"use client";

import classNames from "classnames/bind";
import React, { useContext } from "react";
import styles from "./Orders.module.scss";
import Table from "~/components/Table";
import Expand from "~/components/Expand/Expand";
import Pagination from "~/components/Pagination";
import Image from "next/image";
import icons from "~/assets/icons";
import { TransactionHistoryType, TransactionResponseType } from "~/types/GenericsType";
import WalletContext from "~/contexts/components/WalletContext";
import Loading from "../Loading";
import { historyTransactions } from "~/constants/header-table";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
    isLoading?: boolean;
    isError?: boolean;
    data?: TransactionResponseType;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Orders = ({ className, isLoading, data, isError, page, setPage }: Props) => {
    const { wallet } = useContext(WalletContext);

    return (
        <div className={cx("wrapper", className)}>
            {!Boolean(wallet?.address) ? (
                <div className={cx("no-data")}>
                    <div className={cx("icon-wrapper")}>
                        <Image src={icons.glass} className={cx("icon")} alt="search-icon" />
                    </div>
                    <p className={cx("notification")}>Connect to view your mint and burn requests</p>
                </div>
            ) : (
                <div>
                    {isLoading && (
                        <div className={cx("no-data")}>
                            <p className={cx("notification")}>
                                <Loading className={cx("order-loading")} />
                            </p>
                        </div>
                    )}
                    {isError && (
                        <div className={cx("no-data")}>
                            <div className={cx("icon-wrapper")}>
                                <Image src={icons.glass} className={cx("icon")} alt="search-icon" />
                            </div>
                            <p className={cx("notification")}>There was an error fetching data</p>
                        </div>
                    )}
                    {data && data.histories.length === 0 && (
                        <div className={cx("no-data")}>
                            <div className={cx("icon-wrapper")}>
                                <Image src={icons.glass} className={cx("icon")} alt="search-icon" />
                            </div>
                            <p className={cx("notification")}>No data available</p>
                        </div>
                    )}
                    {data && data.histories.length > 0 && (
                        <>
                            <div className={cx("table-wrapper", "irresponsive")}>
                                <Table
                                    titles={historyTransactions}
                                    className={cx("order-table")}
                                    data={data?.histories as TransactionHistoryType[]}
                                />
                                <Pagination setPage={setPage} page={page} totalItems={data.totalItems} totalPages={data.totalPage} />
                            </div>
                            <div className={cx("responsive")}>
                                <div className={cx("transaction-accordions")}>
                                    {data && data.histories.map((item, index) => <Expand data={item} key={index} className={cx("accordion-item")} />)}
                                </div>
                                <Pagination setPage={setPage} page={page} totalItems={data.totalItems} totalPages={data.totalPage} />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders;
