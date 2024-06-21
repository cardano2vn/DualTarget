"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { BiLogoLinkedin as LinkedinIcon } from "react-icons/bi";
import { FaTelegramPlane as TelegramIcon } from "react-icons/fa";
import styles from "./Founder.module.scss";
import Image from "next/image";
import TranslateContext from "~/contexts/components/TranslateContext";

const cx = classNames.bind(styles);

type Props = {
    id: number;
    avatar: string;
    company?: string;
    firstName: string;
    lastName: string;
    role: string;
    twitter: string;
    linkedin: string;
    description: string;
};

const Founder = function ({
    id,
    avatar,
    firstName,
    lastName,
    role,
    twitter,
    linkedin,
    description,
}: Props) {
    const { t } = useContext(TranslateContext);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("image-wrapper")}>
                <Image className={cx("image")} src={avatar} alt="Avatar" />
                <div className={cx("social-icon")}>
                    {twitter && (
                        <Link className={cx("icon-link")} target="_blank" href={twitter}>
                            <TelegramIcon />
                        </Link>
                    )}
                    {linkedin && (
                        <Link className={cx("icon-link")} target="_blank" href={linkedin}>
                            <LinkedinIcon />
                        </Link>
                    )}
                </div>
            </div>
            <div className={cx("container")}>
                <div className={cx("name")}>{t(`about.${role}.${id}.name`)} </div>
                <div className={cx("role")}>{t(`about.${role}.${id}.major`)}</div>
                <div className={cx("description")}>{t(`about.${role}.${id}.description`)}</div>
            </div>
        </div>
    );
};

export default Founder;
