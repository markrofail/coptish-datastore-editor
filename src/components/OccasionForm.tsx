import React, { useId } from "react";
import { MenuItem, FormControl, InputLabel, FormHelperText, useTheme, SelectChangeEvent } from "@mui/material";
import { OccasionEnum } from "@/types";
import { useTranslations } from "next-intl";
import { Select } from "./SelectField";

interface OccasionFormProps {
    value?: string;
    onChange: (value?: OccasionEnum) => void;
}

export const OccasionForm = ({ value, onChange }: OccasionFormProps) => {
    const labelId = useId();
    const t = useTranslations("OccasionField");
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const newValue = event.target.value;
        if (newValue) onChange(newValue as OccasionEnum);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId} sx={{ fontWeight: 600 }}>
                {t("occasion-field-label")}
            </InputLabel>

            <Select labelId={labelId} value={value || ""} label={t("occasion-field-label")} onChange={handleChange}>
                <MenuItem value="">{t("occasion-field-option-empty")}</MenuItem>
                {Object.entries(OccasionEnum).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {t(`occasion-field-option-${value}`) || value}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText sx={{ color: theme.palette.text.secondary }}>
                {t("occasion-field-helper") || value}
            </FormHelperText>
        </FormControl>
    );
};
