"use client";

import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TranslateContext from "~/contexts/components/TranslateContext";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import globalEn from "~/translations/en/global.json";
import globalVi from "~/translations/vi/global.json";

export const locales = {
    en: "English",
    vi: " Tiếng Việt",
} as const;

i18next.use(initReactI18next).init({
    interpolation: {
        escapeValue: false,
    },
    lng: "en",
    fallbackLng: "vi",
    resources: {
        en: {
            global: globalEn,
        },
        vi: {
            global: globalVi,
        },
    },
});

type Props = {
    children: ReactNode;
};

const TranslateProvider = function ({ children }: Props) {
    const { t, i18n } = useTranslation("global");

    const changeLanguage = function (language: string) {
        i18n.changeLanguage(language);
    };

    return (
        <TranslateContext.Provider value={{ t, changeLanguage }}>
            <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
        </TranslateContext.Provider>
    );
};

export default TranslateProvider;
