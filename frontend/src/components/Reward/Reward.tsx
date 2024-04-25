"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Reward.module.scss";
import { DelegationRewardType } from "~/types/GenericsType";
import Link from "next/link";
import Tippy from "~/components/Tippy";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

type Props = {
    classNames?: string;
    data: DelegationRewardType;
};

const Reward = function ({ data }: Props) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleActiveAccordion = () => {
        setIsVisible((previous) => !previous);
    };

    return (
        <div className={cx("wrapper")} onClick={handleActiveAccordion}>
            <div className={cx("container", { isVisible: isVisible })}>
                <div className={cx("icon", { isVisible: isVisible })} />
                <div
                    className={cx("content-visible", {
                        isVisible: isVisible,
                    })}
                >
                    <div className={cx("content-visible-item")}>
                        <p className={cx("content-visible-item-title")}>
                            <Link
                                href={`https://cardanoscan.io/epoch/${data.epoch}`}
                                target="_blank"
                                className={cx("content-visible-item-title-link")}
                            >
                                {data.epoch}
                            </Link>
                        </p>
                        <p className={cx("content-visible-item-title")}>{data.rewards} ₳</p>
                    </div>
                </div>

                <div
                    className={cx("content", {
                        isVisible: !isVisible,
                    })}
                >
                    <div className={cx("item")}>
                        <div>
                            <span className={cx("title")}>
                                Epoch
                                <Tippy render={<div>{"Amount of SHEN address held at the moment of the snapshot"}</div>}>
                                    <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                                </Tippy>
                            </span>
                            <p className={cx("value")}>
                                <Link className={cx("link")} href={""} target="_blank">
                                    {data.epoch}
                                </Link>
                            </p>
                        </div>
                        <div>
                            <span className={cx("title")}>
                                Amount
                                <Tippy render={<div>{"Amount of SHEN address held at the moment of the snapshot"}</div>}>
                                    <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                                </Tippy>
                            </span>
                            <p className={cx("value")}>{data?.amount} ₳</p>
                        </div>
                        <div>
                            <span className={cx("title")}>
                                Rewards
                                <Tippy render={<div>{"Amount of SHEN address held at the moment of the snapshot"}</div>}>
                                    <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                                </Tippy>
                            </span>
                            <p className={cx("value")}>{data?.rewards} ₳</p>
                        </div>
                        <div>
                            <span className={cx("title")}>
                                Status
                                <Tippy render={<div>{"Amount of SHEN address held at the moment of the snapshot"}</div>}>
                                    <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                                </Tippy>
                            </span>
                            <p className={cx("value")}>
                                <Link className={cx("link")} href={""} target="_blank">
                                    Distributed
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reward;
