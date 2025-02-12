"use client";

import { NextIntlClientProvider } from "next-intl";

export const Providers = ({
    children,
    locale,
    messages,
}: {
    children: React.ReactNode;
    locale: string;
    messages: Record<string, string>;
}) => {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};
