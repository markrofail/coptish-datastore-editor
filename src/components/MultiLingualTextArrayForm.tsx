import React, { Fragment } from "react";
import { MultiLingualTextArray } from "@/types";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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

interface MultiLingualTextArrayFormProps {
    value: MultiLingualTextArray;
    onChange: (newValue: MultiLingualTextArray) => void;
    languages: (keyof MultiLingualTextArray)[];
    multiline?: boolean;
    mode?: "edit" | "view";
    direction?: "column" | "row";
}

export const MultiLingualTextArrayForm = ({
    value,
    onChange,
    languages,
    mode,
    multiline,
    direction,
}: MultiLingualTextArrayFormProps) => {
    const t = useTranslations("MultiLingualText");
    const { dir } = useLocale();

    const handleChange = (field: keyof MultiLingualTextArray, index: number, newValue: string) => {
        const newArray = [...(value[field] || [])];
        newArray[index] = newValue;
        onChange({ ...value, [field]: newArray });
    };

    const handleAdd = (field: keyof MultiLingualTextArray) => {
        const newArray = [...(value[field] || []), ""];
        onChange({ ...value, [field]: newArray });
    };

    const handleDelete = (field: keyof MultiLingualTextArray, index: number) => {
        const newArray = [...(value[field] || [])];
        newArray.splice(index, 1);
        onChange({ ...value, [field]: newArray });
    };

    const labels = LABEL_MAP(t);

    const flexDirection = `${direction}-${dir === "rtl" ? "reverse" : ""}`;
    return (
        <Box sx={{ display: "flex", flexDirection, gap: 1, flex: 1 }}>
            {languages
                .map((lang) => ({ label: labels[lang], field: lang }))
                .map(({ label, field }) => (
                    <Box key={field} sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
                        {mode !== "view" && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <label>{label}</label>
                                {dir === "ltr" && (
                                    <IconButton onClick={() => handleAdd(field)} color="primary">
                                        <AddIcon />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {(value[field] || []).map((item, index) => (
                                <Fragment key={index}>
                                    {mode === "view" ? (
                                        <Typography>{item}</Typography>
                                    ) : (
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <TextField
                                                value={item}
                                                onChange={(e) => handleChange(field, index, e.target.value)}
                                                sx={{ flex: 1, "& .MuiInputBase-root": fontMap[field].style }}
                                                multiline={multiline}
                                                dir={field === "arabic" || field === "coptic_arabic" ? "rtl" : "ltr"}
                                                fullWidth
                                            />

                                            <Box>
                                                <IconButton onClick={() => handleDelete(field, index)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )}
                                </Fragment>
                            ))}
                        </Box>
                        {mode !== "view" && dir === "rtl" && (
                            <Button variant="contained" onClick={() => handleAdd(field)} color="primary">
                                <AddIcon />
                            </Button>
                        )}
                    </Box>
                ))}
        </Box>
    );
};
