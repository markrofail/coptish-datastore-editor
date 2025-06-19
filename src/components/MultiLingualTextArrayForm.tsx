import React, { Fragment } from "react";
import { MultiLingualTextArray } from "@/types";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslations } from "next-intl";
import { useLocale } from "@/app/providers";
import { fontMap } from "@/fonts";
import { LABEL_MAP, Language } from "@/partials/DataForm/LanguageFields";

interface MultiLingualTextArrayFormProps {
    value: MultiLingualTextArray;
    onChange: (newValue: MultiLingualTextArray) => void;
    languages: Language[];
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
    const t = useTranslations();
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

    return (
        <Box sx={{ display: "flex", flexDirection: direction, gap: 1, flex: 1 }}>
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
