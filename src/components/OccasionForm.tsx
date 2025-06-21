import React, { useId } from "react";
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    useTheme,
    styled,
    SelectChangeEvent,
} from "@mui/material";
import { OccasionEnum } from "@/types";
import { useTranslations } from "next-intl";

interface OccasionFormProps {
    value?: string;
    onChange: (value?: OccasionEnum) => void;
}

export const Select = styled(MuiSelect)(({ theme }) => ({
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(60, 60, 67, 0.1)",
    paddingLeft: 12,
    paddingRight: 12,
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.divider,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 6px ${theme.palette.primary.main}33`,
    },
}));

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
