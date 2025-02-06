import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

enum Occasion {
  Annual = "annual",
  GreatLent = "great-lent",
}

interface OccasionFormProps {
  value?: Occasion;
  onChange: (newValue?: Occasion) => void;
}

export const OccasionForm: React.FC<OccasionFormProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="occasion-label">Occasion</InputLabel>
      <Select
        labelId="occasion-label"
        id="occasion"
        value={value || ""}
        label="Occasion"
        onChange={(e) =>
          onChange(e.target.value ? (e.target.value as Occasion) : undefined)
        }
      >
        <MenuItem value="">Select Occasion</MenuItem>
        {Object.values(Occasion).map((occasion) => (
          <MenuItem key={occasion} value={occasion}>
            {occasion}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
