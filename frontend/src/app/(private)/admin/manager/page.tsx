"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Manager.module.scss";
import Tippy from "~/components/Tippy";
import Image from "next/image";
import icons from "~/assets/icons";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
import { calculateTableType } from "~/constants/header-table";
import axios from "axios";
import Loading from "~/components/Loading";
import { useDebounce } from "~/hooks";
import TranslateContext from "~/contexts/components/TranslateContext";
import Button from "~/components/Button";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import jsonToCsvExport from "json-to-csv-export";
import { Credential } from "lucid-cardano";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import Reward from "~/components/Reward";
import { CalculateRewardType } from "~/types/GenericsType";
const cx = classNames.bind(styles);

const DelegationRewardsManager = function () {
    const [page, setPage] = useState<number>(1);
    const { t } = useContext(TranslateContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);
    const { network } = useContext<NetworkContextType>(NetworkContext);

    const [epoch, setEpoch] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [rewards, setReward] = useState<CalculateRewardType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedValue = useDebounce(epoch);

    useEffect(() => {
        if (debouncedValue) {
            (async function () {
                try {
                    setIsLoading(true);
                    const { data } = await axios.get(
                        `${
                            window.location.origin
                        }/api/manager?network=${network.toLowerCase()}&epoch=${epoch}`,
                    );
                    setEndTime(data?.endTime);
                    setStartTime(data?.startTime);
                    console.log(data);
                    const response = data?.results.map(function (result: any, index: number) {
                        let credential: Credential = {
                            type: "Key",
                            hash: result?.paymentAddress,
                        };
                        const address = lucidPlatform.utils.credentialToAddress(credential);
                        return {
                            index: index,
                            epoch: result?.epoch,
                            address: address,
                            amount: result?.amount,
                            reward: result?.rewards,
                            status: "Distributed",
                        };
                    });
                    console.log(response);
                    setReward(response);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [debouncedValue]);

    const handleChangeEpoch = function (e: React.ChangeEvent<HTMLInputElement>) {
        setEpoch(e.target.value);
    };

    const handleClearInput = function () {
        setEpoch("");
    };

    const handleDelegateRewards = function () {
        jsonToCsvExport({
            data: rewards,
            filename: `dualtarget-reward-${epoch} `,
            delimiter: ",",
            headers: ["STT", "Epoch", " Wallet Address", "Amount", "Reward", "Status"],
        });
    };

    return (
        <div className={cx("wrapper")}>
            <title>Delegation Reward - Dualtarget</title>
            <div className={cx("container")}>
                <h1 className={cx("title")}>{t("delegation rewards.card.title")}</h1>
                <h2 className={cx("sub-title")}>{t("delegation rewards.card.sub title")}</h2>
                <form className={cx("form")}>
                    <section className={cx("label")}>
                        <div className={cx("input-name")}>
                            {t("delegation rewards.card.fields.address.title")}
                        </div>
                        <Tippy
                            render={
                                <div>{t("delegation rewards.card.fields.address.instruction")}</div>
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
                    </section>
                    <div className={cx("form-content-wrapper")}>
                        <section className={cx("search")}>
                            <div className={cx("search-input")}>
                                <input
                                    className={cx("input")}
                                    value={epoch}
                                    onChange={handleChangeEpoch}
                                    type="text"
                                    placeholder={t(
                                        "delegation rewards.card.fields.address.placeholder",
                                    )}
                                />
                            </div>
                            <div
                                className={cx("search-delete", {
                                    show: epoch,
                                })}
                                onClick={handleClearInput}
                            />
                        </section>
                        <Button
                            disabled={!Boolean(epoch)}
                            className={cx("submit-button")}
                            type="button"
                            onClick={handleDelegateRewards}
                        >
                            Export CSV
                        </Button>
                    </div>
                </form>

                <section className={cx("summary")}>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>
                            {t("delegation rewards.card.current epoch")}
                        </h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <div>
                                    {rewards.length > 0 ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            {epoch}
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </div>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Start time</h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {startTime ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            {startTime}
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>End time</h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {endTime ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            {endTime}
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                </section>

                {isLoading ? (
                    <div className={cx("loading-wrapper")}>
                        <Loading className={cx("loading")} />
                    </div>
                ) : (
                    <div>
                        {rewards.length && (
                            <div>
                                {rewards.length === 0 ? (
                                    <section className={cx("status")}>
                                        <div className={cx("no-data")} />
                                        <span>{t("layout.notification.no data")}</span>
                                    </section>
                                ) : (
                                    <div>
                                        <Table
                                            center
                                            titles={calculateTableType}
                                            data={rewards}
                                            className={cx("desktop-tx-history")}
                                        />
                                        <div className={cx("reponsive-tx-history")}>
                                            {rewards?.map(function (item: any, index: number) {
                                                return <Reward data={item} key={index} />;
                                            })}
                                        </div>
                                        {rewards.length > 0 && (
                                            <Pagination
                                                totalPages={page}
                                                page={page}
                                                setPage={setPage}
                                                totalItems={rewards.length}
                                            />
                                        )}

                                        <div className={cx("note")}>
                                            <p>
                                                * Reward amount lower than 2 ₳ will be added to
                                                pending rewards
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {rewards.length == 0 && (
                            <section className={cx("status")}>
                                <div className={cx("no-data")} />
                                <span>{t("layout.notification.error to fetch data")}</span>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DelegationRewardsManager;
