import React, { useState } from "react";
import { MultiLingualText } from "@/app/types";
import { Box, TextField } from "@mui/material";

interface MultiLingualTextFormProps {
  value: MultiLingualText;
  onChange: (newValue: MultiLingualText) => void;
  multiline?: boolean;
}

export const MultiLingualTextForm = ({
  value,
  onChange,
  multiline,
}: MultiLingualTextFormProps) => {
  const [focusedField, setFocusedField] = useState<
    keyof MultiLingualText | null
  >(null);

  const handleChange = (field: keyof MultiLingualText, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flex: 1 }}>
      {["english", "arabic", "coptic", "coptic_english", "coptic_arabic"].map(
        (field) => (
          <TextField
            key={field}
            label={field}
            value={value[field as keyof MultiLingualText] || ""}
            onChange={(e) =>
              handleChange(field as keyof MultiLingualText, e.target.value)
            }
            onFocus={() => setFocusedField(field as keyof MultiLingualText)}
            onBlur={() => setFocusedField(null)}
            sx={{
              flex: field === focusedField ? 5 : 1, // Grow if focused, otherwise normal
              "& .MuiInputBase-root": {
                fontFamily:
                  field === "coptic" ? "CSAvaVeni, sans-serif" : "inherit",
              },
              transition: "flex-grow 0.3s ease-in-out",
            }}
            rows={multiline ? 3 : 1}
            multiline={multiline}
            fullWidth
          />
        )
      )}
    </Box>
  );
};
