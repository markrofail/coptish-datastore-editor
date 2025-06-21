import { createTheme, Shadows } from "@mui/material";
import { arabicFont, englishFont } from "@/fonts";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#007aff", // iOS blue
        },
        secondary: {
            main: "#ff9500", // iOS orange
        },
        background: {
            default: "#f9f9f9",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000de",
            secondary: "#3c3c4399",
        },
        divider: "#c6c6c8",
    },
    typography: {
        fontFamily: `-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Arial, sans-serif`,
        h1: { fontSize: "2rem", fontWeight: 600 },
        h2: { fontSize: "1.75rem", fontWeight: 500 },
        h3: { fontSize: "1.5rem", fontWeight: 500 },
        body1: { fontSize: "1rem", fontWeight: 400 },
        body2: { fontSize: "0.9rem", fontWeight: 400 },
        button: { textTransform: "none", fontWeight: 500 },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        "none",
        "0 1px 2px rgba(60, 60, 67, 0.1)", // subtle iOS-style shadow
        ...Array(23).fill("0 2px 4px rgba(60, 60, 67, 0.1)"),
    ] as Shadows,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "8px 16px",
                },
                containedPrimary: {
                    backgroundColor: "#007aff",
                    "&:hover": {
                        backgroundColor: "#005fdd",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 1px 3px rgba(60, 60, 67, 0.1)",
                },
            },
        },
    },
});

export const rtlTheme = createTheme({
    ...theme,
    direction: "rtl",
    typography: {
        fontSize: 18,
        fontFamily: arabicFont.style.fontFamily,
    },
});

export const ltrTheme = createTheme({
    ...theme,
    direction: "ltr",
    typography: {
        fontFamily: englishFont.style.fontFamily,
    },
});
