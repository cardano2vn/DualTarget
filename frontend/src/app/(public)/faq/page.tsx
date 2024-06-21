"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./FrequentlyAskedQuestion.module.scss";
import FaqItem from "~/components/FaqItem";
import useFAQs from "~/data/faqs";

const cx = classNames.bind(styles);

type Props = {};

const FrequentlyAskedQuestion = function ({}: Props) {
    const { t, faqs } = useFAQs();
    return (
        <div className={cx("wrapper")}>
            <title>FAQS - Dualtarget</title>
            <section className={cx("background")} />

            <section className={cx("title-container")}>
                <h1 className={cx("title")}>FAQ</h1>
                <h3 className={cx("sub-title")}>{t("faq.sub title")}</h3>
            </section>

            <section className={cx("container")}>
                {faqs.map(function (faq, index: number) {
                    return <FaqItem key={index} Children={faq.Children} title={faq.title} />;
                })}
            </section>
        </div>
    );
};

export default FrequentlyAskedQuestion;
