import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "../globals.css";

const LOCALES = ["en", "ar"];

export async function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

// Dynamically import needed messages for given locale
async function getMessages(locale: string) {
    const messageModule = await import(`@/i18n/messages/${locale}.json`);

    return messageModule.default;
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Data Entry Form",
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}
export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { locale } = await params;
    const messages = await getMessages(locale);

    return (
        <html lang={locale === "en" ? "en" : "ar"}>
            <body className={`${geistSans.variable} ${geistMono.variable}`} dir={locale === "ar" ? "rtl" : "ltr"}>
                <Providers messages={messages} locale={locale}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
