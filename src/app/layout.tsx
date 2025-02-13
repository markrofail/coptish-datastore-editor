import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Data Entry Form",
};

interface RootLayoutProps {
    children: React.ReactNode;
}
export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
