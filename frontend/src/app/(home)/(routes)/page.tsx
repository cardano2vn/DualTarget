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

const cx = classNames.bind(styles);

export default function Home() {
    const { t } = useContext<TranslateContextType>(TranslateContext);
    const { loading } = useContext<LucidContextType>(LucidContext);
    const { pool } = useContext<StatisticContextType>(StatisticsContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Transactions"],
        queryFn: () =>
            axios.get<StatisticsType>(`${window.location.origin}/api/statistics?network`, {
                timeout: 5000,
            }),
        enabled: true,
    });

    console.log(data?.data);

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
                        <span className={cx("prefix")}>Dualtarget</span>
                        <span className={cx("title")}>{t("home")}</span>
                    </div>
                    <div className={cx("introduction-description")}>
                        <div className={cx("description-child")}>
                            Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("stats")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("stats")}>
                        <Card title="Pool" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin title="Total wallet" amount={pool.totalWallet} loading={loading} />
                            <Coin title="Total UTxO" amount={pool.totalUTxO} denominations="UTxO" loading={loading} />
                            <Coin title="Total Volume Lock" amount={pool.totalADA} denominations="₳" loading={loading} />
                            <Coin title="Total DJED" amount={pool.totalDJED} denominations="DJED" loading={loading} />
                            <Button className={cx("stat-button")} href={routes.deposit}>
                                Deposit
                            </Button>
                        </Card>
                        <Card title="Statistics" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin title="Total transactions" amount={data?.data.totalTransaction} loading={loading} />
                            <Coin title="Total Volume Lock" amount={data?.data.totalVolumeDepositsADA} denominations="₳" loading={loading} />
                            <Coin title="Total Volume Un Lock" amount={data?.data.totalVolumeWithdrawsADA} denominations="₳" loading={loading} />
                            <Coin title="Total DJED" amount={data?.data.totalVolumeWithdrawsDJED} denominations="DJED" loading={loading} />
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                Withdraw
                            </Button>
                        </Card>
                    </div>
                    <div className={cx("sub-stats")}>*Deposit\Withdraw includes base fee and operator fee</div>
                </div>
            </section>
            <section className={cx("reverse-wrapper")}>
                <div className={cx("reverse-inner")}>
                    <Gutter className={cx("reverse-card")}>
                        <div>
                            <Title icon={icons.reserves} title="Profit margin" />

                            <div className={cx("reserves")}>
                                <div className={cx("reserve-ratio")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>ROS</h2>
                                    </div>
                                    <div className={cx("reserves-value-ratio")}>
                                        0.004<span className="suffix">%</span>
                                    </div>
                                </div>
                                <div className={cx("base-reserves")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>Base Reserve</h2>
                                    </div>
                                    <div className={cx("reserves-value-base")}>
                                        <div className={cx("base-reserves-value")}>37,107,970.3052 ₳</div>
                                        <span className={cx("approximate")}>≈21,987,529.98 DJED</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("last-updated-mobile")}>Last updated: {convertDatetime(Date.now() / 1000)} UTC</div>
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
                            <h2 className={cx("about-title")}>About dualtarget</h2>
                            <p className={cx("about-description")}>Staking and increasing assets with a decentralized</p>
                            <span className={cx("about-content")}>
                                We will develop a platform that enables users to choose dual targets and trading methods directly within their
                                wallets. Simultaneously, we'll create automated trading bots on decentralized exchanges
                            </span>
                            <span className={cx("about-content")}>
                                We will develop a platform that enables users to choose dual targets and trading methods directly within their
                                wallets. Simultaneously, we'll create automated trading bots on decentralized exchanges
                            </span>
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                Contact us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
