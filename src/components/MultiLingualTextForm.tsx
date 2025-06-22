import React from "react";
import { MultiLingualText } from "@/types";
import { Box, TextField as MuiTextField, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { fontMap } from "@/fonts";
import { Language, LABEL_MAP } from "@/partials/DataForm/LanguageFields";

interface MultiLingualTextFormProps {
    value: MultiLingualText;
    onChange: (newValue: MultiLingualText) => void;
    languages: Language[];
    multiline?: boolean;
}

export const TextField = styled(MuiTextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
        borderRadius: 12, // rounded corners
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(60, 60, 67, 0.1)", // subtle iOS-style shadow
        paddingLeft: 12,
        paddingRight: 12,
        // Smooth transition for focus
        transition: theme.transitions.create(["box-shadow", "border-color"], {
            duration: theme.transitions.duration.short,
        }),
    },
    "& label": {
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.light,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 8px ${theme.palette.primary.main}44`,
        },
    },
}));

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
