import React, { useContext } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import parse from "html-react-parser";
import styles from "~/components/FaqItem/FaqItem.module.scss";
import images from "~/assets/images";
import TranslateContext from "~/contexts/components/TranslateContext";
import { TFunction } from "i18next";

const cx = classNames.bind(styles);

function useFAQs(): {
    t: TFunction<"translation", undefined>;
    faqs: {
        title: string;
        Children: () => JSX.Element;
    }[];
} {
    const { t } = useContext(TranslateContext);
    return {
        t,
        faqs: [
            {
                title: t("faq.questions.1"),
                Children: function (): JSX.Element {
                    return (
                        <span
                            style={{
                                fontSize: 14,
                            }}
                            className={cx("faq-description")}
                        >
                            {parse(t("faq.answers.1"))}
                        </span>
                    );
                },
            },
            {
                title: t("faq.questions.2"),
                Children: function (): JSX.Element {
                    return (
                        <span
                            style={{
                                fontSize: 14,
                            }}
                            className={cx("faq-description")}
                        >
                            {parse(t("faq.answers.2"))}
                        </span>
                    );
                },
            },

            {
                title: t("faq.questions.3"),
                Children: function (): JSX.Element {
                    return (
                        <span
                            style={{
                                fontSize: 14,
                            }}
                            className={cx("faq-description")}
                        >
                            {parse(t("faq.answers.3"))}
                        </span>
                    );
                },
            },
        ] as {
            title: string;
            Children: () => JSX.Element;
        }[],
    };
}

export default useFAQs;
