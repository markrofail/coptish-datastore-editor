import React from "react";
import { MultiLingualText } from "@/types";
import { Box, TextField } from "@mui/material";
import localFont from "next/font/local";
import { useTranslations } from "next-intl";

const cSAvaVeni = localFont({
    src: "../../public/fonts/CSAvaVeni.ttf",
});

interface MultiLingualTextFormProps {
    value: MultiLingualText;
    onChange: (newValue: MultiLingualText) => void;
    languages?: (keyof MultiLingualText)[];
    multiline?: boolean;
}

export const MultiLingualTextForm = ({ value, onChange, languages, multiline }: MultiLingualTextFormProps) => {
    const t = useTranslations("MultiLingualText");

    const handleChange = (field: keyof MultiLingualText, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flex: 1 }}>
            {(
                [
                    { field: "english", label: t("multiLingual-field-option-english") },
                    { field: "arabic", label: t("multiLingual-field-option-arabic") },
                    { field: "coptic", label: t("multiLingual-field-option-coptic") },
                    { field: "coptic_english", label: t("multiLingual-field-option-copticEnglish") },
                    { field: "coptic_arabic", label: t("multiLingual-field-option-copticArabic") },
                ] as const
            )
                .filter(({ field }) => !languages || languages?.includes(field))
                .map(({ label, field }) => (
                    <TextField
                        key={field}
                        label={label}
                        value={value[field as keyof MultiLingualText] || ""}
                        onChange={(e) => handleChange(field as keyof MultiLingualText, e.target.value)}
                        sx={{ flex: 1, "& .MuiInputBase-root": { ...(field === "coptic" ? cSAvaVeni.style : {}) } }}
                        multiline={multiline}
                        dir={field === "arabic" || field === "coptic_arabic" ? "rtl" : "ltr"}
                        fullWidth
                    />
                ))}
        </Box>
    );
};
