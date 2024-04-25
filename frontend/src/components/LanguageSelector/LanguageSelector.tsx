import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import i18next from "i18next";
import React, { useContext } from "react";
import TranslateContext from "~/contexts/components/TranslateContext";
import { locales } from "~/contexts/providers/TranslateProvider";
import styles from "./LanguageSelector.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

const LanguageSelector = function () {
    const { changeLanguage } = useContext(TranslateContext);
    const currentLanguage = locales[i18next.language as keyof typeof locales];
    const handleChangeLanguage = function (lang: "vi" | "en") {
        changeLanguage(lang);
    };

    return (
        <Tippy
            placement="bottom-end"
            offset={[0, 0]}
            interactive
            render={(attrs) => (
                <div {...attrs} tabIndex={-1}>
                    <div className={cx("tippy-languages")}>
                        <button
                            className={cx("language-button", {
                                active: currentLanguage === locales["en"],
                            })}
                            onClick={() => handleChangeLanguage("en")}
                        >
                            English
                        </button>
                        <button
                            className={cx("language-button", {
                                active: currentLanguage === locales["vi"],
                            })}
                            onClick={() => handleChangeLanguage("vi")}
                        >
                            Vietnamese
                        </button>
                    </div>
                </div>
            )}
        >
            <button className={cx("change-language-button")}>
                {currentLanguage === locales["vi"] ? (
                    <Image className={cx("current-language-flag-image")} src={icons.vietnameseFlag} alt="Vietnamese flag" />
                ) : (
                    <Image className={cx("current-language-flag-image")} src={icons.unitedKingdomFlag} alt="English flag" />
                )}
            </button>
        </Tippy>
    );
};

export default LanguageSelector;
