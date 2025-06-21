"use client";

import React from "react";
import enMessages from "@/i18n/messages/en.json";
import arMessages from "@/i18n/messages/ar.json";
import { NextIntlClientProvider } from "next-intl";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useLocalStorage } from "usehooks-ts";
import { ltrTheme, rtlTheme } from "./theme";

const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
});

type Locale = "en" | "ar";
type LocaleContext = { locale: Locale; setLocale: (locale: Locale) => void; dir: "rtl" | "ltr" };
const LocaleContext = React.createContext<LocaleContext>({ locale: "en", setLocale: () => {}, dir: "ltr" });
export const useLocale = () => React.useContext(LocaleContext);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useLocalStorage<Locale>("settings:locale", "en");
    const messages = locale === "en" ? enMessages : arMessages;
    const dir = locale === "en" ? "ltr" : "rtl";

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider theme={dir === "rtl" ? rtlTheme : ltrTheme}>
                <CacheProvider value={dir === "rtl" ? rtlCache : ltrCache}>
                    <LocaleContext.Provider value={{ locale, setLocale, dir }}>
                        <CssBaseline />
                        {children}
                    </LocaleContext.Provider>
                </CacheProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
};
