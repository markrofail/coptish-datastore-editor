import React, { useState } from "react";
import { MultiLingualText } from "@/types";
import { Box, TextField } from "@mui/material";
import localFont from "next/font/local";

const cSAvaVeni = localFont({
    src: "../../public/fonts/CSAvaVeni.ttf",
});

interface MultiLingualTextFormProps {
    value: MultiLingualText;
    onChange: (newValue: MultiLingualText) => void;
    multiline?: boolean;
}

export const MultiLingualTextForm = ({ value, onChange, multiline }: MultiLingualTextFormProps) => {
    const [focusedField, setFocusedField] = useState<keyof MultiLingualText | null>(null);

    const handleChange = (field: keyof MultiLingualText, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flex: 1 }}>
            {[
                { field: "english", label: "English" },
                { field: "arabic", label: "Arabic" },
                { field: "coptic", label: "Coptic" },
                { field: "coptic_english", label: "Coptic (English)" },
                { field: "coptic_arabic", label: "Coptic (Arabic)" },
            ].map(({ label, field }) => (
                <TextField
                    key={field}
                    label={label}
                    value={value[field as keyof MultiLingualText] || ""}
                    onChange={(e) => handleChange(field as keyof MultiLingualText, e.target.value)}
                    onFocus={() => setFocusedField(field as keyof MultiLingualText)}
                    onBlur={() => setFocusedField(null)}
                    sx={{
                        flex: field === focusedField ? 5 : 1, // Grow if focused, otherwise normal
                        transition: "flex-grow 0.3s ease-in-out",
                        "& .MuiInputBase-root": {
                            ...(field === "coptic" ? cSAvaVeni.style : {}),
                        },
                    }}
                    rows={multiline ? 3 : 1}
                    multiline={multiline}
                    dir={field === "arabic" || field === "coptic_arabic" ? "rtl" : "ltr"}
                    fullWidth
                />
            ))}
        </Box>
    );
};
