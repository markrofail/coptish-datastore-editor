import React from "react";
import { MultiLingualTextArray } from "@/types";
import { Box, IconButton as MuiIconButton, Button, useTheme, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslations } from "next-intl";
import { fontMap } from "@/fonts";
import { LABEL_MAP, Language } from "@/partials/DataForm/LanguageFields";
import { TextField } from "./MultiLingualTextForm";

interface MultiLingualTextArrayFormProps {
    value: MultiLingualTextArray;
    onChange: (newValue: MultiLingualTextArray) => void;
    languages: Language[];
    multiline?: boolean;
    direction?: "column" | "row";
}

const IconButton = styled(MuiIconButton)(() => ({
    borderRadius: 10,
    padding: 8,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
}));

const LanguageTextFieldRow = ({
    value,
    onChange,
    onDelete,
    lang,
    multiline,
}: {
    value: string;
    onChange: (val: string) => void;
    onDelete: () => void;
    lang: Language;
    multiline?: boolean;
}) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
                fullWidth
                value={value}
                onChange={(e) => onChange(e.target.value)}
                multiline={multiline}
                dir={lang === "arabic" || lang === "coptic_arabic" ? "rtl" : "ltr"}
                InputProps={{
                    sx: fontMap[lang].style,
                }}
            />
            <IconButton onClick={onDelete} color="error">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

const LanguageFieldSection = ({
    label,
    values,
    onChange,
    onAdd,
    onDelete,
    lang,
    multiline,
}: {
    label: string;
    values: string[];
    onChange: (index: number, val: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    lang: Language;
    multiline?: boolean;
}) => {
    const t = useTranslations();
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {label}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {values.map((val, idx) => (
                    <LanguageTextFieldRow
                        key={idx}
                        value={val}
                        onChange={(v) => onChange(idx, v)}
                        onDelete={() => onDelete(idx)}
                        lang={lang}
                        multiline={multiline}
                    />
                ))}
            </Box>

            <Button
                variant="contained"
                onClick={onAdd}
                color="primary"
                endIcon={<AddIcon />}
                sx={{ alignSelf: "flex-start", mt: 1 }}
            >
                {t("add-button-label")}
            </Button>
        </Box>
    );
};

export const MultiLingualTextArrayForm = ({
    value,
    onChange,
    languages,
    multiline,
    direction = "column",
}: MultiLingualTextArrayFormProps) => {
    const t = useTranslations();
    const labels = LABEL_MAP(t);

    const handleChange = (lang: keyof MultiLingualTextArray, index: number, val: string) => {
        const arr = [...(value[lang] || [])];
        arr[index] = val;
        onChange({ ...value, [lang]: arr });
    };

    const handleAdd = (lang: keyof MultiLingualTextArray) => {
        const arr = [...(value[lang] || []), ""];
        onChange({ ...value, [lang]: arr });
    };

    const handleDelete = (lang: keyof MultiLingualTextArray, index: number) => {
        const arr = [...(value[lang] || [])];
        arr.splice(index, 1);
        onChange({ ...value, [lang]: arr });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: direction, gap: 2 }}>
            {languages.map((lang) => (
                <LanguageFieldSection
                    key={lang}
                    label={labels[lang]}
                    values={value[lang] || []}
                    onChange={(idx, val) => handleChange(lang, idx, val)}
                    onAdd={() => handleAdd(lang)}
                    onDelete={(idx) => handleDelete(lang, idx)}
                    lang={lang}
                    multiline={multiline}
                />
            ))}
        </Box>
    );
};
