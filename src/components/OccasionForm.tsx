import React, { useId } from "react";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { OccasionEnum } from "@/types";
import { useTranslations } from "next-intl";

interface OccasionFormProps {
    value?: string;
    onChange: (value?: OccasionEnum) => void;
}

export const OccasionForm = ({ value, onChange }: OccasionFormProps) => {
    const labelId = useId();
    const t = useTranslations("OccasionField");

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{t("occasion-field-label")}</InputLabel>
            <Select
                labelId={labelId}
                value={value || ""}
                label={t("occasion-field-label")}
                onChange={(e) => onChange(e.target.value ? (e.target.value as OccasionEnum) : undefined)}
            >
                <MenuItem value="" />
                {Object.entries(OccasionEnum).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {t(`occasion-field-option-${value}`) || value}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{t("occasion-field-helper") || value}</FormHelperText>
        </FormControl>
    );
};
