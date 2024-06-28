"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Withdraw.module.scss";
import Image from "next/image";
import images from "~/assets/images";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import Tippy from "~/components/Tippy";
import Input from "~/components/Input";
import { useForm } from "react-hook-form";
import InputRange from "~/components/InputRange";
import DropdownMenu from "~/components/DropdownMenu";
import { Item } from "~/components/DropdownMenu/DropdownMenu";
import { useQuery } from "@tanstack/react-query";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import {
    CalculateSellingStrategy,
    ChartDataType,
    ChartHistoryRecord,
    ClaimableUTxO,
    TransactionResponseType,
} from "~/types/GenericsType";
import axios from "axios";
import CustomChart from "~/components/CustomChart";
import CountUp from "react-countup";
import { useDebounce } from "~/hooks";
import TranslateContext from "~/contexts/components/TranslateContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { BATCHER_FEE, COUNTER_UTXO, DECIMAL_PLACES } from "~/constants";
import { ToastContextType } from "~/types/contexts/ToastContextType";
import ToastContext from "~/contexts/components/ToastContext";

type WithdrawType = {
    amount: number;
};

const cx = classNames.bind(styles);

const WITHDRAW_MODES: Item[] = [
    { name: "All", id: 0 },
    { name: "Only profit", id: 1 },
    { name: "Select parts", id: 2 },
];

const Withdraw = function () {
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { toast } = useContext<ToastContextType>(ToastContext);
    const {
        waitingWithdraw,
        waitingCalculateEUTxO,
        withdraw,
        calculateClaimEUTxO,
        previewWithdraw,
        txHashWithdraw,
    } = useContext<SmartContractContextType>(SmartContractContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const [page, setPage] = useState<number>(1);
    const [claimableUtxos, setClaimableUtxos] = useState<Array<ClaimableUTxO>>([]);
    const [sellingStrategies, setSellingStrategies] = useState<CalculateSellingStrategy[]>([]);
    const [currentWithdrawMode, setCurrentWithdrawMode] = useState<Item>(WITHDRAW_MODES[0]);
    const [withdrawableProfit, setWithdrawableProfit] = useState<number[]>([0, 0]);
    const debouncedValue = useDebounce<number[]>(withdrawableProfit);
    const [fees, setFees] = useState<{
        amountADA: number;
        amountDJED: number;
        amountProfit: number;
    }>({ amountADA: 0, amountDJED: 0, amountProfit: 0 });
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Transactions", page, txHashWithdraw],
        queryFn: () =>
            axios.get<TransactionResponseType>(
                `${window.location.origin}/api/history/transaction?wallet_address=${
                    wallet?.address
                }&page=${page}&page_size=5&network=${network.toLowerCase()}`,
                { timeout: 5000 },
            ),
        enabled: !!Boolean(wallet?.address) || (!!Boolean(wallet?.address) && !!txHashWithdraw),
    });

    const { t } = useContext(TranslateContext);

    const {
        data: chartDataRecords,
        isLoading: isGetChartRecordsLoading,
        isSuccess: isGetChartRecordsSuccess,
    } = useQuery({
        queryKey: ["ChartData"],
        queryFn: () =>
            axios.get<ChartHistoryRecord[] | null>(`${window.location.origin}/api/chart`),
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<WithdrawType>();

    const maxOfSellingStrategies = useMemo(() => {
        if (sellingStrategies.length > 0) {
            return (
                Math.max(
                    ...sellingStrategies.map(({ buyPrice }) => {
                        return (Number(buyPrice) as number) / 1000000;
                    }),
                ) + 0.1
            );
        }

        return 0;
    }, [sellingStrategies]);

    useEffect(() => {
        setWithdrawableProfit([0, maxOfSellingStrategies]);
    }, [maxOfSellingStrategies]);

    useEffect(() => {
        const [min, max] = debouncedValue;
        lucid &&
            calculateClaimEUTxO({
                lucid,
                mode: currentWithdrawMode.id,
                min,
                max,
            }).then((res: ClaimableUTxO[]) => {
                setClaimableUtxos(res);
                const amountADA = (res as ClaimableUTxO[]).reduce(
                    (acc, claim) => acc + Number(claim.utxo.assets.lovelace),
                    0,
                );

                const amountDJED: number = (res as ClaimableUTxO[]).reduce(function (acc, claim) {
                    const amount: number = isNaN(
                        Number(claim.utxo.assets[process.env.MIN_TOKEN_ASSET_PREPROD!]),
                    )
                        ? 0
                        : Number(Number(claim.utxo.assets[process.env.MIN_TOKEN_ASSET_PREPROD!]));
                    return acc + amount;
                }, 0);

                setFees(function (previous) {
                    return {
                        ...previous,
                        amountDJED: amountDJED,
                    };
                });

                const amountProfit: number = (res as Array<ClaimableUTxO>).reduce(function (
                    acc,
                    claim,
                ) {
                    let balance: number = 0;
                    if (claim.isLimitOrder == 0) {
                        balance = isNaN(Number(claim.minimumAmountOutProfit))
                            ? 0
                            : Number(claim.minimumAmountOutProfit);
                    }
                    return acc + balance;
                },
                0);
                setFees(function (previous) {
                    return {
                        ...previous,
                        amountADA: amountADA / DECIMAL_PLACES,
                        amountDJED: amountDJED / DECIMAL_PLACES,
                        amountProfit: amountProfit / DECIMAL_PLACES,
                    };
                });

                setValue("amount", amountADA / 1000000);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWithdrawMode, lucid, debouncedValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (Boolean(txHashWithdraw) && lucid) {
                previewWithdraw({
                    lucid,
                    range:
                        withdrawableProfit.length === 0
                            ? [0, maxOfSellingStrategies]
                            : (withdrawableProfit as [number, number]),
                }).then((response) => {
                    setWithdrawableProfit([0, maxOfSellingStrategies]);
                    setSellingStrategies(response);
                });
            }
        }, 5000);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lucid, txHashWithdraw, maxOfSellingStrategies]);

    const historyPrices: ChartDataType = useMemo(() => {
        if (isGetChartRecordsSuccess && chartDataRecords.data) {
            const prices = chartDataRecords.data.map((history) => [
                +history.closeTime,
                +history.close,
            ]);
            return prices as ChartDataType;
        }
        return [];
    }, [chartDataRecords, isGetChartRecordsSuccess]);

    const previewSellingStrategies = function () {
        if (lucid) {
            if (claimableUtxos.length > COUNTER_UTXO) {
                toast.warn({
                    message: `${t("layout.toast.warn.divide_transactions.1")} ${
                        Math.ceil(calculateClaimEUTxO.length / COUNTER_UTXO) + 1
                    } ${t("layout.toast.warn.divide_transactions.2")}`,
                });
            }
            previewWithdraw({
                lucid,
                range:
                    withdrawableProfit.length === 0
                        ? [0, maxOfSellingStrategies]
                        : (withdrawableProfit as [number, number]),
            }).then((response) => {
                setWithdrawableProfit([0, maxOfSellingStrategies]);
                setSellingStrategies(response);
            });
        }
    };

    const onWithdraw = handleSubmit(async (data) => {
        try {
            lucid &&
                withdraw({
                    lucid,
                    claimableUtxos,
                }).then(() => {});
        } catch (error) {
            console.warn("Error: ", error);
        }
    });

    const onRangeChange = function (value: number[]) {
        setWithdrawableProfit(value);
    };

    return (
        <div className={cx("wrapper")}>
            <title>Withdraw - Dualtarget</title>
            <section className={cx("header-wrapper")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>{t("withdraw.title")}</h2>
                </div>
                <div className={cx("stats")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("stats")}>
                            <div className={cx("card-wrapper")}>
                                <Card
                                    title={t("withdraw.title")}
                                    icon={images.logo}
                                    className={cx("stat-djed-stablecoin")}
                                >
                                    <form onSubmit={onWithdraw} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            {t("deposit.card.balance")}:&nbsp;
                                            <div className={cx("balance-quanlity")}>
                                                <span>
                                                    <CountUp
                                                        end={wallet?.balance || 0}
                                                        start={0}
                                                        decimals={5}
                                                        decimalPlaces={5}
                                                    />
                                                    <span className={cx("currency")}>&nbsp;₳</span>
                                                </span>
                                                <span>
                                                    <CountUp
                                                        end={wallet?.djed || 0}
                                                        start={0}
                                                        decimals={5}
                                                        decimalPlaces={5}
                                                    />
                                                    <span className={cx("currency")}>
                                                        &nbsp;DJED
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx("form-wrapper")}>
                                            <DropdownMenu
                                                classNameWrapper={cx("withdraw-mode-dropdown")}
                                                currentItem={currentWithdrawMode}
                                                selectItem={setCurrentWithdrawMode}
                                                items={WITHDRAW_MODES}
                                            />
                                            <Input
                                                className={cx("input-amount")}
                                                name="amount"
                                                placeholder={t(
                                                    "withdraw.card.fields.amount.placeholder",
                                                )}
                                                register={register}
                                                errorMessage={errors.amount?.message}
                                                disabled={true}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />

                                            <InputRange
                                                onChange={onRangeChange}
                                                min={0}
                                                max={Number(maxOfSellingStrategies.toFixed(4))}
                                                disabled={
                                                    currentWithdrawMode.id === 0 ||
                                                    currentWithdrawMode.id === 1 ||
                                                    maxOfSellingStrategies === 0
                                                }
                                            />
                                        </div>

                                        <div className={cx("info")}>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>{t("withdraw.card.fees")}</span>
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
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                {waitingCalculateEUTxO ? (
                                                    <Loading />
                                                ) : (
                                                    <>
                                                        {claimableUtxos.length === 0
                                                            ? "-"
                                                            : `${BATCHER_FEE / DECIMAL_PLACES} ₳`}
                                                    </>
                                                )}
                                            </div>

                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>
                                                        {t("withdraw.card.you will receive")}
                                                    </span>
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
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                <div className={cx("fees")}>
                                                    <span className={cx("fee-wrapper")}>
                                                        {waitingCalculateEUTxO ? (
                                                            <Loading />
                                                        ) : sellingStrategies.length > 0 ? (
                                                            <span className={cx("fee-currency")}>
                                                                {fees.amountADA.toFixed(5)}&nbsp;₳
                                                            </span>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </span>

                                                    <span className={cx("fee-wrapper")}>
                                                        {waitingCalculateEUTxO ? (
                                                            <Loading />
                                                        ) : sellingStrategies.length > 0 ? (
                                                            <span className={cx("fee-currency")}>
                                                                &nbsp;{fees.amountDJED}
                                                                &nbsp;DJED
                                                            </span>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>Profit</span>
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
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                <div className={cx("fees")}>
                                                    <span className={cx("fee-wrapper")}>
                                                        {waitingCalculateEUTxO ? (
                                                            <Loading />
                                                        ) : sellingStrategies.length > 0 ? (
                                                            <span className={cx("fee-currency")}>
                                                                {fees.amountProfit.toFixed(5)}
                                                                &nbsp;DJED
                                                            </span>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx("actions-wrapper")}>
                                            <Button
                                                disabled={
                                                    !lucid ||
                                                    waitingWithdraw ||
                                                    waitingCalculateEUTxO
                                                }
                                                loading={waitingWithdraw || waitingCalculateEUTxO}
                                                onClick={onWithdraw}
                                                className={cx("withdraw-button")}
                                            >
                                                {(!waitingWithdraw || !waitingCalculateEUTxO) &&
                                                    t("withdraw.card.button")}
                                            </Button>
                                            <Tippy
                                                placement="top-end"
                                                render={
                                                    <div>{t("deposit.card.button calculate")} </div>
                                                }
                                            >
                                                <Button
                                                    className={cx("preview-button")}
                                                    type="button"
                                                    onClick={previewSellingStrategies}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className={cx("preview-icon")}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                                                        />
                                                    </svg>
                                                </Button>
                                            </Tippy>
                                        </div>
                                    </form>
                                </Card>
                                <Image
                                    className={cx("coin-image-left")}
                                    src={images.coinDjedLeft}
                                    alt="coin-djed"
                                />
                            </div>
                            <CustomChart
                                isLoading={isGetChartRecordsLoading}
                                data={historyPrices}
                                preview={sellingStrategies}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={cx("header-order")}>
                    <h2 className={cx("title")}>{t("withdraw.orders.title")}</h2>
                </div>
                <Orders
                    page={page}
                    setPage={setPage}
                    data={data?.data}
                    isError={isError}
                    isLoading={isLoading}
                    className={cx("orders")}
                />
            </section>
        </div>
    );
};

export default Withdraw;
