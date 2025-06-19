import React from "react";
import { MultiLingualText } from "@/types";
import { Box, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { fontMap } from "@/fonts";
import { Language, LABEL_MAP } from "@/partials/DataForm/LanguageFields";

interface MultiLingualTextFormProps {
    value: MultiLingualText;
    onChange: (newValue: MultiLingualText) => void;
    languages: Language[];
    multiline?: boolean;
}

export const MultiLingualTextForm = ({ value, onChange, languages, multiline }: MultiLingualTextFormProps) => {
    const t = useTranslations();

    const handleChange = (field: keyof MultiLingualText, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    const labels = LABEL_MAP(t);

    return (
        <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            {languages
                .map((lang) => ({ label: labels[lang], field: lang }))
                .map(({ label, field }) => (
                    <Box key={field} sx={{ flex: 1 }}>
                        <TextField
                            label={label}
                            value={value[field as keyof MultiLingualText] || ""}
                            onChange={(e) => handleChange(field as keyof MultiLingualText, e.target.value)}
                            sx={{ "& .MuiInputBase-root": fontMap[field].style }}
                            multiline={multiline}
                            dir={field === "arabic" || field === "coptic_arabic" ? "rtl" : "ltr"}
                            fullWidth
                        />
                    </Box>
                ))}
        </Box>
    );
};
