import React from "react";
import { MultiLingualTextArray } from "@/types";
import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import localFont from "next/font/local";
import { useTranslations } from "next-intl";

const cSAvaVeni = localFont({
    src: "../../public/fonts/CSAvaVeni.ttf",
});

interface MultiLingualTextArrayFormProps {
    value: MultiLingualTextArray;
    onChange: (newValue: MultiLingualTextArray) => void;
    languages?: (keyof MultiLingualTextArray)[];
    multiline?: boolean;
}

export const MultiLingualTextArrayForm = ({
    value,
    onChange,
    languages,
    multiline,
}: MultiLingualTextArrayFormProps) => {
    const t = useTranslations("MultiLingualText");

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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
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
                    <Box key={field} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <label>{label}</label>
                            <IconButton onClick={() => handleAdd(field)} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Box>
                        {(value[field] || []).map((item, index) => (
                            <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <TextField
                                    value={item}
                                    onChange={(e) => handleChange(field, index, e.target.value)}
                                    sx={{
                                        flex: 1,
                                        "& .MuiInputBase-root": { ...(field === "coptic" ? cSAvaVeni.style : {}) },
                                    }}
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
                        ))}
                    </Box>
                ))}
        </Box>
    );
};
