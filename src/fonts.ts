import { Inter, Rubik } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import { MultiLingualText } from "./types";

export const englishFont = Inter({ subsets: ["latin"] });
export const arabicFont = localFont({ src: "../public/fonts/AdobeArabic-Bold.otf" });
export const copticFont = localFont({ src: "../public/fonts/CSAvaVeni.ttf" });

export const fontMap: Record<keyof MultiLingualText, NextFont> = {
    arabic: arabicFont,
    coptic_arabic: arabicFont,
    english: englishFont,
    coptic_english: englishFont,
    coptic: copticFont,
};
