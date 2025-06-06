import React from "react";
import { MultiLingualText } from "@/types";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useLocale } from "@/app/providers";
import { fontMap } from "@/fonts";

const LABEL_MAP = (t: (id: string) => string) => ({
    english: t("multiLingual-field-option-english"),
    arabic: t("multiLingual-field-option-arabic"),
    coptic: t("multiLingual-field-option-coptic"),
    coptic_english: t("multiLingual-field-option-copticEnglish"),
    coptic_arabic: t("multiLingual-field-option-copticArabic"),
});

interface MultiLingualTextFormProps {
    value: MultiLingualText;
    onChange: (newValue: MultiLingualText) => void;
    languages: (keyof MultiLingualText)[];
    multiline?: boolean;
    mode?: "edit" | "view";
}

export const MultiLingualTextForm = ({ value, onChange, languages, multiline, mode }: MultiLingualTextFormProps) => {
    const t = useTranslations("MultiLingualText");
    const { dir } = useLocale();

    const handleChange = (field: keyof MultiLingualText, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    const labels = LABEL_MAP(t);

    const flexDirection = `row-${dir === "rtl" ? "reverse" : ""}`;
    return (
        <Box sx={{ display: "flex", flexDirection, gap: 1, flex: 1 }}>
            {languages
                .map((lang) => ({ label: labels[lang], field: lang }))
                .map(({ label, field }) => (
                    <Box key={field} sx={{ flex: 1 }}>
                        {mode === "view" ? (
                            <Typography variant="h6"> {value[field]}</Typography>
                        ) : (
                            <TextField
                                label={label}
                                value={value[field as keyof MultiLingualText] || ""}
                                onChange={(e) => handleChange(field as keyof MultiLingualText, e.target.value)}
                                sx={{ "& .MuiInputBase-root": fontMap[field].style }}
                                multiline={multiline}
                                dir={field === "arabic" || field === "coptic_arabic" ? "rtl" : "ltr"}
                                fullWidth
                            />
                        )}
                    </Box>
                ))}
        </Box>
    );
};
