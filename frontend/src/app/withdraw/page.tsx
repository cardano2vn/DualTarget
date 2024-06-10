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

type WithdrawType = {
    amount: number;
};

const cx = classNames.bind(styles);

const WITHDRAW_MODES: Item[] = [
    { name: "All", id: 0 },
    { name: "Only profit", id: 1 },
    { name: "Select parts", id: 2 },
];

const FEE = 1.5;

const Withdraw = function () {
    const { lucid } = useContext<LucidContextType>(LucidContext);
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
        queryFn: () => axios.get<ChartHistoryRecord[] | null>(`${window.location.origin}/chart`),
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
                setClaimableUtxos(res); // TODO: CÓA ĐI KHÔNG THÌ SAI
                const amount = (res as ClaimableUTxO[]).reduce(
                    (acc, claim) => acc + Number(claim.utxo.assets.lovelace),
                    0,
                );
                setValue("amount", amount / 1000000);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWithdrawMode, lucid, debouncedValue]);

    useEffect(() => {
        if (lucid) {
            console.log("Refresh Chart");
            previewWithdraw({ lucid }).then((response) => {
                console.log(response);
                setSellingStrategies(response);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lucid]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (Boolean(txHashWithdraw) && lucid) {
                previewWithdraw({ lucid }).then((response) => {
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
                +history.high,
            ]);
            return prices as ChartDataType;
        }
        return [];
    }, [chartDataRecords, isGetChartRecordsSuccess]);

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
                                            <span>
                                                {t("withdraw.balance")}:{" "}
                                                <CountUp end={wallet?.balance || 0} start={0} /> ₳
                                            </span>
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
                                                    currentWithdrawMode.id === 1
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
                                                            : `${FEE} ₳`}
                                                    </>
                                                )}
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>
                                                        {t("withdraw.card.you will receive")}
                                                    </span>
                                                </div>
                                                {waitingCalculateEUTxO ? (
                                                    <Loading />
                                                ) : (
                                                    <>
                                                        {claimableUtxos.length === 0
                                                            ? "-"
                                                            : `${Number(watch("amount")) - FEE} ₳`}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            disabled={
                                                !lucid || waitingWithdraw || waitingCalculateEUTxO
                                            }
                                            onClick={onWithdraw}
                                            RightIcon={
                                                <Loading
                                                    className={cx("withdraw-loading", {
                                                        withdrawing: waitingWithdraw,
                                                    })}
                                                />
                                            }
                                            className={cx("withdraw-button")}
                                        >
                                            {(!waitingWithdraw || !waitingCalculateEUTxO) &&
                                                t("withdraw.card.button")}
                                        </Button>
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
