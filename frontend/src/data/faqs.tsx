import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "~/components/FaqItem/FaqItem.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);
type Props = {};

const faqs = [
    {
        title: "What is DJED's stability mechanism?",
        Children: function (): JSX.Element {
            return (
                <span className={cx("faq-description")}>
                    <p className={cx("faq-paragraph")}>
                        DJED is an overcollateralized stablecoin that uses exogenous collateral (ADA) to ensure stability. The protocol is backed by
                        400-800% overcollateralization and is guaranteed by its reserve coin, SHEN. The stability of DJED is based on
                        overcollateralization, which eliminates the need for trust in a governance token as seen in algorithmic stablecoins. The
                        platform is also fully decentralized and community-driven, allowing for open-source development and community involvement in
                        minting and burning DJED and SHEN.
                    </p>
                    <p className={cx("faq-paragraph")}>
                        <Image className={cx("faq-image")} src={images.eternl} alt="" />
                    </p>
                </span>
            );
        },
    },
    {
        title: "What is DJED's stability mechanism?",
        Children: function (): JSX.Element {
            return (
                <span>
                    <p className={cx("faq-paragraph")}>
                        <b className={cx("faq-bold")}>Collateral</b> - Djed uses exogenous collateral (ADA). A typical algorithmic stablecoin uses
                        endogenous collateral, such as: FRAX, Synthetix and UST.
                    </p>
                </span>
            );
        },
    },

    {
        title: "What happens to SHEN's price if the ratio falls below 400%?",
        Children: function (): JSX.Element {
            return (
                <span>
                    <p className={cx("faq-paragraph")}>
                        The buying price of SHEN, is determined by the equation PbRc. This means that if Ptrc (price target reserve coin) is not
                        defined, the protocol takes the minimum price. Otherwise, it takes the maximum between the equity divided by the number of RC
                        and the minimum price.
                    </p>
                    <p className={cx("faq-paragraph")}>
                        The buying price of SHEN, is determined by the equation PbRc. This means that if Ptrc (price target reserve coin) is not
                        defined, the protocol takes the minimum price. Otherwise, it takes the maximum between the equity divided by the number of RC
                        and the minimum price.
                    </p>
                </span>
            );
        },
    },
];

export default faqs;
