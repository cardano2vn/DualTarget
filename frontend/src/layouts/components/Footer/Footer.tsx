import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import Link from "next/link";
import routes from "~/configs/routes";
import TranslateContext from "~/contexts/components/TranslateContext";

const cx = classNames.bind(styles);

const Footer = function () {
    const { t } = useContext(TranslateContext);

    return (
        <footer className={cx("wrapper")}>
            <div className={cx("wrapper-inner")}>
                <div className={cx("term-and-whitepaper")}>
                    <Link href={routes.term} target="_blank" className={cx("term")}>
                        {t("layout.footer.term of use")}
                    </Link>
                    <Link target="_blank" href="https://www.cardano2vn.io" className={cx("whitepaper")}>
                        Cardano2vn
                    </Link>
                </div>
                <div className={cx("corporation")}>
                    <span> {t("layout.footer.powered by")}</span>
                    <span className={cx("corporation-logo")}>
                        <Image className={cx("logo")} src={icons.c2vn} alt="c2vn" />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
