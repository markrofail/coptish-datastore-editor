import React from "react";
import { StyleSheet, Text as PDFText, TextProps as PDFTextProps } from "@react-pdf/renderer";
// import { ZOOM_MULTIPLIER } from "../constants";
const ZOOM_MULTIPLIER = 1;

export interface TextProps extends PDFTextProps {
    text?: string;
    language: "english" | "arabic" | "coptic";
    variant:
        | "title"
        | "heading1"
        | "heading2"
        | "heading3"
        | "heading4"
        | "heading5"
        | "heading6"
        | "body"
        | "menu"
        | "pageHeader";
    bold?: boolean;
    center?: boolean;
    color?: string;
}

export const Text = ({ language, variant, color, center, bold, text, style: _style, ...rest }: TextProps) => {
    const style = {
        ...languageStyles[language],
        ...variantStyles[variant],
        // wordBreak: "normal",
        textAlign: center ? ("center" as const) : undefined,
        fontWeight: bold ? ("bold" as const) : ("normal" as const),
        color,
        ..._style,
    };

    if (language === "arabic") {
        style.fontSize = parseInt(String(style.fontSize)) + 4 * ZOOM_MULTIPLIER;
    }
    // if (language === "coptic") {
    //   style.fontSize = parseInt(String(style.fontSize)) - 1 * ZOOM_MULTIPLIER;
    // }

    return text ? (
        <PDFText style={style} {...rest} wrap>
            {text}
        </PDFText>
    ) : null;
};

const languageStyles = StyleSheet.create({
    english: {
        // textAlign: "justify",
        // lineHeight: 1.4,
        // fontFamily: "NotoSerif",
    },
    coptic: {
        // textAlign: "justify",
        // lineHeight: 1.2,
        // fontFamily: "AvvaShenouda",
        // fontFamily: "ArialCoptic",
        fontFamily: "CSAvaVeni",
    },
    arabic: {
        direction: "rtl",
        // textAlign: "justify",
        lineHeight: 2,
        fontFamily: "AdobeArabic",
        // fontFamily: "AdobeArabicBold",
        // fontFamily: "SakkalMajalla",
    },
});

const variantStyles = StyleSheet.create({
    title: { fontWeight: "bold", fontSize: 42 * ZOOM_MULTIPLIER },
    heading1: { fontWeight: "bold", fontSize: 32.0 * ZOOM_MULTIPLIER },
    heading2: { fontWeight: "bold", fontSize: 24.0 * ZOOM_MULTIPLIER },
    heading3: { fontWeight: "bold", fontSize: 18.72 * ZOOM_MULTIPLIER },
    heading4: { fontWeight: "bold", fontSize: 16.0 * ZOOM_MULTIPLIER },
    heading5: { fontWeight: "bold", fontSize: 13.28 * ZOOM_MULTIPLIER },
    heading6: { fontWeight: "bold", fontSize: 10.72 * ZOOM_MULTIPLIER },
    body: { fontWeight: "normal", fontSize: 16 * ZOOM_MULTIPLIER },
    menu: { fontWeight: "normal", fontSize: 8 * ZOOM_MULTIPLIER },
    pageHeader: { fontWeight: "normal", fontSize: 8 * ZOOM_MULTIPLIER },
});

// const normalizeArabicText = (text: string) =>
//   text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9\u064B-\u064D:-\\.،/]\)\))/g, "");
