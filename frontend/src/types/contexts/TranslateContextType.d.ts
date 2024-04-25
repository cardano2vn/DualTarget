import { TFunction } from "i18next";

export type TranslateContextType = {
    t: TFunction<"translation", undefined>;
    changeLanguage: (language: string) => void;
};
