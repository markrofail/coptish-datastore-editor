import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { OccasionEnum } from "@/types";
import { useTranslations } from "next-intl";

interface OccasionFormProps {
    value?: string;
    onChange: (newValue?: OccasionEnum) => void;
}

export const OccasionForm = ({ value, onChange }: OccasionFormProps) => {
    const t = useTranslations("OccasionField");

    return (
        <FormControl fullWidth>
            <InputLabel id="occasion-label">{t("occasion-field-label")}</InputLabel>
            <Select
                labelId="occasion-label"
                id="occasion"
                value={value || ""}
                label={t("occasion-field-label")}
                onChange={(e) => onChange(e.target.value ? (e.target.value as OccasionEnum) : undefined)}
            >
                <MenuItem value="">Select Occasion</MenuItem>
                {Object.entries(OccasionEnum).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {key}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
