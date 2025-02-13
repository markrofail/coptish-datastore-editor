"use client";

import { NextIntlClientProvider } from "next-intl";
import React from "react";
import enMessages from "@/i18n/messages/en.json";
import arMessages from "@/i18n/messages/ar.json";

type Locale = "en" | "ar";
type LocaleContext = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = React.createContext<LocaleContext>({ locale: "en", setLocale: () => {} });
export const useLocale = () => React.useContext(LocaleContext);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = React.useState<Locale>("en");
    const messages = locale === "en" ? enMessages : arMessages;

    console.log(JSON.stringify({ locale, messages }));

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
        </NextIntlClientProvider>
    );
};
