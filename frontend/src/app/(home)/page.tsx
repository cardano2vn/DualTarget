"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "~/assets/images";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Gutter from "~/components/Card/Gutter";
import Title from "~/components/Card/Title";
import routes from "~/configs/routes";
import Coin from "~/components/Card/Coin";
import { TranslateContextType } from "~/types/contexts/TranslateContextType";
import TranslateContext from "~/contexts/components/TranslateContext";
import Button from "~/components/Button";
import { StatisticContextType } from "~/types/contexts/StatisticContextType";
import StatisticsContext from "~/contexts/components/StatisticContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import convertDatetime from "~/helpers/convert-datetime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatisticsType } from "~/types/GenericsType";
import CountUp from "react-countup";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";

const cx = classNames.bind(styles);

export default function Home() {
    const { t } = useContext<TranslateContextType>(TranslateContext);
    const { loading } = useContext<LucidContextType>(LucidContext);
    const { pool } = useContext<StatisticContextType>(StatisticsContext);
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Transactions"],
        queryFn: () =>
            axios.get<StatisticsType>(`${window.location.origin}/api/statistics?network=${network.toLowerCase()}`, {
                timeout: 5000,
            }),
        enabled: true,
    });

    const words = [t("home.title")];
    const [text, count] = useTypewriter({
        words,
        loop: 1,
        delaySpeed: 5000,
        typeSpeed: 40,
    });

    return (
        <div className={cx("wrapper")}>
            <div className={cx("background-gallaxy-wrapper")}>
                <Image src={images.galaxy} alt="background-gallaxy" className={cx("home-background-image")} />
            </div>
            <div className={cx("background-cardano-side-wrapper")}>
                <Image src={images.cardanoSide} alt="cardano-side" className={cx("cardano-side-background-image")} />
            </div>
            <div className={cx("background-floating-coins-wrapper")}>
                <Image src={images.djedHeaderCoins} alt="djed-coins" className={cx("djed-coins-background-image")} />
            </div>
            <div className={cx("background-floating-coins-mobile-wrapper")}>
                <Image src={images.djedHeaderCoinsMobile} alt="djed-coins" className={cx("djed-coins-mobile-background-image")} />
            </div>
            <section className={cx("content")}>
                <div className={cx("introduction")}>
                    <div className={cx("introduction-header")}>
                        <span className={cx("prefix")}>
                            <span>Dualtarget</span>
                            {/* <Cursor cursorColor="#FFFFFF" /> */}
                        </span>
                    </div>
                    <div className={cx("introduction-description")}>
                        <div className={cx("description-child")}>
                            <span>{t("home.title")}</span>
                            {/* <span>{text}</span> */}
                            {/* <Cursor cursorColor="#FFFFFF" /> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("stats")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("stats")}>
                        <Card title={t("home.card pool.title")} icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin title={t("home.card pool.total wallet")} decimals={0} amount={pool.totalWallet} loading={loading || isLoading} />
                            <Coin
                                title={t("home.card pool.total UTxO")}
                                decimals={0}
                                amount={pool.totalUTxO}
                                denominations="UTxO"
                                loading={loading || isLoading}
                            />
                            <Coin
                                title={t("home.card pool.total volume lock")}
                                amount={pool.totalADA}
                                denominations="₳"
                                loading={loading || isLoading}
                            />
                            <Coin
                                title={t("home.card pool.total DJED")}
                                amount={pool.totalDJED}
                                denominations="DJED"
                                loading={loading || isLoading}
                            />
                            <Button className={cx("stat-button")} href={routes.deposit}>
                                {t("home.card pool.button")}
                            </Button>
                        </Card>
                        <Card title={t("home.card statistics.title")} icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin
                                title={t("home.card statistics.total transactions")}
                                decimals={0}
                                amount={data?.data.totalTransaction}
                                loading={loading || isLoading}
                            />
                            <Coin
                                title={t("home.card statistics.total volume lock")}
                                amount={data?.data.totalVolumeDepositsADA}
                                denominations="₳"
                                loading={loading || isLoading}
                            />
                            <Coin
                                title={t("home.card statistics.total volume unlock")}
                                amount={data?.data.totalVolumeWithdrawsADA}
                                denominations="₳"
                                loading={loading || isLoading}
                            />
                            <Coin
                                title={t("home.card statistics.total DJED")}
                                amount={data?.data.totalVolumeWithdrawsDJED}
                                denominations="DJED"
                                loading={loading || isLoading}
                            />
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                {t("home.card statistics.button")}
                            </Button>
                        </Card>
                    </div>
                    <div className={cx("sub-stats")}>{t("home.card sub")}</div>
                </div>
            </section>
            <section className={cx("reverse-wrapper")}>
                <div className={cx("reverse-inner")}>
                    <Gutter className={cx("reverse-card")}>
                        <div>
                            <Title icon={icons.reserves} title={t("home.card profit.title")} />

                            <div className={cx("reserves")}>
                                <div className={cx("reserve-ratio")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>ROS</h2>
                                    </div>
                                    <div className={cx("reserves-value-ratio")}>
                                        <CountUp decimals={2} enableScrollSpy start={0} end={Number(0.04)} />
                                        <span className="suffix">%</span>
                                    </div>
                                </div>
                                <div className={cx("base-reserves")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>{t("home.card profit.base reserve")}</h2>
                                    </div>
                                    <div className={cx("reserves-value-base")}>
                                        <div className={cx("base-reserves-value")}>
                                            <CountUp decimals={6} enableScrollSpy start={0} end={Number(data?.data.totalVolumeDepositsADA)} /> ₳
                                        </div>
                                        <span className={cx("approximate")}>
                                            ≈ <CountUp decimals={6} enableScrollSpy start={0} end={Number(data?.data.totalVolumeWithdrawsDJED)} />{" "}
                                            DJED
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("last-updated-mobile")}>
                                {t("home.card profit.update")} {convertDatetime(Date.now() / 1000)} UTC
                            </div>
                        </div>
                    </Gutter>
                </div>
            </section>

            <section className={cx("about")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("about-inner")}>
                        <div className={cx("video-iframe-wrapper")}>
                            <iframe
                                className={cx("video-iframe")}
                                src="https://www.youtube.com/embed/DCWY93O_QAU"
                                title="Daultarget - Mục Tiêu Kép"
                                frameBorder={"none"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                        <div className={cx("about-content-wrapper")}>
                            <h2 className={cx("about-title")}>{t("home.about dualtarget.title")}</h2>
                            <p className={cx("about-description")}>{t("home.about dualtarget.sub title")}</p>
                            <span className={cx("about-content")}>{t("home.about dualtarget.content.paragraph 1")}</span>
                            <span className={cx("about-content")}>{t("home.about dualtarget.content.paragraph 2")}</span>
                            <Button className={cx("stat-button")} href={routes.about}>
                                {t("home.about dualtarget.button")}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
