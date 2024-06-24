"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders";
import styles from "./Deposit.module.scss";
import Image from "next/image";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import {
    CalculateSellingStrategy,
    ChartDataType,
    TransactionResponseType,
} from "~/types/GenericsType";
import { ToastContextType } from "~/types/contexts/ToastContextType";
import ToastContext from "~/contexts/components/ToastContext";

import Tippy from "~/components/Tippy";
import { Controller, useForm } from "react-hook-form";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import InputNumber from "~/components/InputNumber";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChartHistoryRecord } from "~/types/GenericsType";
import CustomChart from "~/components/CustomChart";
import calculateSellingStrategy from "~/utils/calculate-selling-strategy";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import CountUp from "react-countup";
import images from "~/assets/images";
import TranslateContext from "~/contexts/components/TranslateContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { COUNTER_UTXO, DECIMAL_PLACES } from "~/constants";
const cx = classNames.bind(styles);

type DepositeType = {
    income: string;
    priceHight: string;
    priceLow: string;
    stake: string;
    step: string;
    totalADA: string;
};

const Deposit = function () {
    const [page, setPage] = useState<number>(1);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const [sellingStrategies, setSellingStrategies] = useState<CalculateSellingStrategy[]>([]);
    const [fees, setFees] = useState<{
        amountADA: number;
        amountDJED: number;
    }>({ amountADA: 0, amountDJED: 0 });
    const { deposit, waitingDeposit, txHashDeposit, previewDeposit } =
        useContext<SmartContractContextType>(SmartContractContext);
    const { t } = useContext(TranslateContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Transactions", page, txHashDeposit],
        queryFn: () =>
            axios.get<TransactionResponseType>(
                `${window.location.origin}/api/history/transaction?wallet_address=${
                    wallet?.address
                }&page=${page}&page_size=5&network=${network.toLowerCase()}`,
                { timeout: 7_000 },
            ),
        enabled: Boolean(wallet?.address) || (Boolean(wallet?.address) && Boolean(txHashDeposit)),
    });

    const { toast } = useContext<ToastContextType>(ToastContext);

    const {
        handleSubmit,
        watch,
        control,
        reset,
        trigger,
        getValues,
        formState: { errors, isDirty, isValid },
    } = useForm<DepositeType>({
        defaultValues: {
            income: "",
            priceHight: "",
            priceLow: "",
            stake: "",
            step: "",
            totalADA: "",
        },
        mode: "onChange",
    });

    const {
        data: chartDataRecords,
        isLoading: isGetChartRecordsLoading,
        isSuccess: isGetChartRecordsSuccess,
    } = useQuery({
        queryKey: ["ChartData"],
        queryFn: () =>
            axios.get<ChartHistoryRecord[] | null>(`${window.location.origin}/api/chart`),
        refetchInterval: 1 * 60 * 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (Object.keys(errors).length !== 0 || isDirty) {
            Object.keys(errors).forEach((key) => {
                trigger(key as keyof DepositeType);
            });
        }
    }, [t]);

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

    const currentPrice = useMemo(() => {
        if (historyPrices && historyPrices.length > 0) {
            return historyPrices[historyPrices.length - 1][1];
        }
        return 0;
    }, [historyPrices]);

    const onDeposite = handleSubmit((data) => {
        const amountDJED = wallet?.djed;
        const amountADA = wallet?.balance;

        if (lucid) {
            deposit({
                lucid,
                sellingStrategies,
                currentPrice,
            })
                .then(() => {
                    toast.success({
                        message: "Deposit sucessfully completed.",
                    });
                    reset();
                    setSellingStrategies([]);
                })

                .catch((error) => {
                    console.log(error);
                });
        } else {
            toast.warn({ message: "You can connect wallets." });
        }
    });

    const { income, priceHight, priceLow, stake, step, totalADA } = watch();

    const handleCalculateSellingStrategy = function () {
        if (
            income &&
            priceHight &&
            priceLow &&
            stake &&
            step &&
            totalADA &&
            Object.keys(errors).length === 0
        ) {
            const result: CalculateSellingStrategy[] = calculateSellingStrategy({
                income: Number(income),
                priceHight: Number(priceHight) * DECIMAL_PLACES,
                priceLow: Number(priceLow) * DECIMAL_PLACES,
                stake: Number(stake),
                step: Number(step),
                totalADA: Number(totalADA) * DECIMAL_PLACES,
            });
            const _fees = previewDeposit({ sellingStrategies: result, currentPrice });
            setFees(_fees);

            if (
                _fees.amountADA > Number(wallet?.balance) ||
                _fees.amountDJED > Number(wallet?.djed)
            ) {
                toast.error({
                    message: "Insufficient assets in your wallet",
                });
                return;
            }

            if (result.length > COUNTER_UTXO) {
                toast.error({
                    message: `You need to divide the steps into smaller than ${COUNTER_UTXO} steps to deposit.`,
                });
                return;
            }

            setSellingStrategies(result);
        } else {
            trigger();
        }
    };

    const handleRefreshChart = function () {
        reset();
        setSellingStrategies([]);
    };

    return (
        <div className={cx("wrapper")}>
            <title>Deposit - Dualtarget</title>
            <section className={cx("header-wrapper")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>{t("deposit.title")}</h2>
                </div>
                <div className={cx("stats")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("stats")}>
                            <div className={cx("card-wrapper")}>
                                <Card
                                    title={t("deposit.card.title")}
                                    icon={images.logo}
                                    className={cx("stat-djed-stablecoin")}
                                >
                                    <form onSubmit={onDeposite} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            {t("deposit.card.balance")}:&nbsp;
                                            <div className={cx("balance-quanlity")}>
                                                <span>
                                                    <CountUp
                                                        end={wallet?.balance || 0}
                                                        start={0}
                                                        decimals={3}
                                                        decimalPlaces={3}
                                                    />
                                                    <span className={cx("currency")}>&nbsp;₳</span>
                                                </span>
                                                <span>
                                                    <CountUp
                                                        end={wallet?.djed || 0}
                                                        start={0}
                                                        decimals={3}
                                                        decimalPlaces={3}
                                                    />
                                                    <span className={cx("currency")}>
                                                        &nbsp;DJED
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx("form-wrapper")}>
                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="priceLow"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                        validate: (value) =>
                                                            parseFloat(value) <=
                                                                parseFloat(
                                                                    getValues("priceHight"),
                                                                ) ||
                                                            t("layout.form.errors.messages.min"),
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            className={cx("input")}
                                                            {...field}
                                                            value={watch("priceLow")}
                                                            description={t(
                                                                "deposit.card.fields.min price.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.min price.title",
                                                            )} ($)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.min price.placeholder",
                                                            )}
                                                            errorMessage={errors.priceLow?.message}
                                                        />
                                                    )}
                                                />
                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="priceHight"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                        validate: (value) =>
                                                            parseFloat(value) >=
                                                                parseFloat(getValues("priceLow")) ||
                                                            t("layout.form.errors.messages.max"),
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            tooltipPlacement="top-end"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                trigger("priceLow");
                                                            }}
                                                            className={cx("input")}
                                                            description={t(
                                                                "deposit.card.fields.max price.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.max price.title",
                                                            )} ($)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.max price.placeholder",
                                                            )}
                                                            errorMessage={
                                                                errors.priceHight?.message
                                                            }
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="income"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            className={cx("input")}
                                                            errorMessage={errors.income?.message}
                                                            description={t(
                                                                "deposit.card.fields.desired income.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.desired income.title",
                                                            )} ($)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.desired income.placeholder",
                                                            )}
                                                        />
                                                    )}
                                                />
                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="stake"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            tooltipPlacement="top-end"
                                                            {...field}
                                                            className={cx("input")}
                                                            errorMessage={errors.stake?.message}
                                                            description={t(
                                                                "deposit.card.fields.stake percentage.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.stake percentage.title",
                                                            )} (%)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.stake percentage.placeholder",
                                                            )}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="step"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            className={cx("input")}
                                                            errorMessage={errors.step?.message}
                                                            description={t(
                                                                "deposit.card.fields.step.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.step.title",
                                                            )} (%)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.step.placeholder",
                                                            )}
                                                        />
                                                    )}
                                                />

                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="totalADA"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: t(
                                                                "layout.form.errors.messages.required",
                                                            ),
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            tooltipPlacement="top-end"
                                                            {...field}
                                                            description={t(
                                                                "deposit.card.fields.total ADA.instruction",
                                                            )}
                                                            title={`${t(
                                                                "deposit.card.fields.total ADA.title",
                                                            )} ($)`}
                                                            placeholder={t(
                                                                "deposit.card.fields.total ADA.placeholder",
                                                            )}
                                                            className={cx("input")}
                                                            errorMessage={errors.totalADA?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className={cx("info")}>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>{t("deposit.card.fees")}</span>
                                                    <Tippy
                                                        render={
                                                            <div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Request Fee</span>
                                                                    <span>-</span>
                                                                </div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Operator Fee</span>
                                                                    <span>
                                                                        {sellingStrategies.length >
                                                                        0
                                                                            ? "1.5 ₳"
                                                                            : "-"}
                                                                    </span>
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
                                                {waitingDeposit ? (
                                                    <Loading />
                                                ) : sellingStrategies.length > 0 ? (
                                                    "1.5 ₳"
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>{t("deposit.card.you will pay")}</span>
                                                    <Tippy
                                                        render={
                                                            <div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Amount ADA</span>
                                                                    <span>-</span>
                                                                </div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Amount MIN</span>
                                                                    <span>
                                                                        {sellingStrategies.length >
                                                                        0
                                                                            ? "1.5 ₳"
                                                                            : "-"}
                                                                    </span>
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
                                                        {waitingDeposit ? (
                                                            <Loading />
                                                        ) : sellingStrategies.length > 0 ? (
                                                            <span className={cx("fee-currency")}>
                                                                {fees.amountADA.toFixed(6)}&nbsp;₳
                                                            </span>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </span>

                                                    <span className={cx("fee-wrapper")}>
                                                        {waitingDeposit ? (
                                                            <Loading />
                                                        ) : sellingStrategies.length > 0 ? (
                                                            <span className={cx("fee-currency")}>
                                                                &nbsp;{fees.amountDJED.toFixed(6)}
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
                                                    waitingDeposit ||
                                                    !isValid ||
                                                    sellingStrategies.length === 0
                                                }
                                                className={cx("deposite-button")}
                                            >
                                                {t("deposit.card.button deposit")}
                                            </Button>
                                            <Tippy
                                                placement="top-end"
                                                render={
                                                    <div>{t("deposit.card.button calculate")} </div>
                                                }
                                            >
                                                <Button
                                                    className={cx("calculate-button")}
                                                    type="button"
                                                    onClick={handleCalculateSellingStrategy}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className={cx("calculate-icon")}
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
                            </div>
                            <CustomChart
                                onRefresh={handleRefreshChart}
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
                    <h2 className={cx("title")}>{t("deposit.history.title")}</h2>
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

export default Deposit;
