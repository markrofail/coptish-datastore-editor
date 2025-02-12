import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { OccasionEnum } from "@/types";

interface OccasionFormProps {
    value?: string;
    onChange: (newValue?: OccasionEnum) => void;
}

export const OccasionForm = ({ value, onChange }: OccasionFormProps) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel id="occasion-label">Occasion</InputLabel>
            <Select
                labelId="occasion-label"
                id="occasion"
                value={value || ""}
                label="Occasion"
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
