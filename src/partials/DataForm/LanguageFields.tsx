import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";
import { useTranslations } from "next-intl";

export const LABEL_MAP = (t: (id: string) => string): Record<Language | "off", string> => ({
    english: t("DataForm.language-field-option-english"),
    arabic: t("DataForm.language-field-option-arabic"),
    coptic: t("DataForm.language-field-option-coptic"),
    coptic_english: t("DataForm.language-field-option-copticEnglish"),
    coptic_arabic: t("DataForm.language-field-option-copticArabic"),
    off: t("DataForm.language-field-option-off"),
});

const LANGUAGES = ["english", "arabic", "coptic", "coptic_english", "coptic_arabic"] as const;
export type Language = (typeof LANGUAGES)[number];

interface LanguageFieldsProps {
    value: Language[];
    onChange: (value: Language[]) => void;
    size: number;
}

export const LanguageFields = ({ value, onChange, size }: LanguageFieldsProps) => {
    const [firstValue, ...restValues] = value;
    const firstOption = [...LANGUAGES];
    const restOptions: (Language | "off")[] = LANGUAGES.filter((lang) => lang !== firstValue);
    restOptions.push("off");

    const handleFirstChange = (value: Language) => {
        if (restValues.includes(value)) {
            const filteredValues = restValues.filter((v) => v !== value);
            onChange([value, ...filteredValues]);
        } else {
            onChange([value, ...restValues]);
        }
    };

    const handleRestChange = (value: Language | "off") => {
        if (value === "off") {
            onChange([firstValue]);
        } else {
            onChange([firstValue, value]);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <SelectField id="first" value={firstValue} onChange={handleFirstChange} options={firstOption} />
            {Array(size - 1)
                .fill(0)
                .map((_, i) => (
                    <SelectField
                        key={`rest-${i}`}
                        id={`rest-${i}`}
                        value={restValues[i] || "off"}
                        onChange={handleRestChange}
                        options={restOptions}
                    />
                ))}
        </Box>
    );
};

interface SelectFieldProps {
    id: string;
    value: Language;
    options: (Language | "off")[];
    onChange: (value: Language) => void;
}

const SelectField = ({ id, value, options, onChange }: SelectFieldProps) => {
    const t = useTranslations();

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as Language);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-select-label`}>{t("DataForm.language-field-label")}</InputLabel>
            <Select
                labelId={`${id}-select-label`}
                id={`${id}-select`}
                value={value}
                label={id}
                onChange={handleChange}
                fullWidth
            >
                {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {LABEL_MAP(t)[opt]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
