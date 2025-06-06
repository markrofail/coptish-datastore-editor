import React from "react";
import { Box, Typography } from "@mui/material";
import { SubReading } from "@/types";
import { useTranslations } from "next-intl";
import { MultiLingualTextArrayForm } from "@/components/MultiLingualTextArrayForm";

interface ReadingFormProps {
    formData: SubReading;
    setFormData: (value: SubReading) => void;
    mode?: "edit" | "view";
}

export const ReadingForm = ({ formData, mode, setFormData }: ReadingFormProps) => {
    const t = useTranslations("ReadingForm");

    return (
        <>
            <Box>
                {mode !== "view" && <Typography variant="h6">{t("text-field-label")}</Typography>}

                <MultiLingualTextArrayForm
                    value={formData.text}
                    onChange={(value) => setFormData({ ...formData, text: value })}
                    languages={["english", "arabic"]}
                    direction="row"
                    mode={mode}
                    multiline
                />
            </Box>
        </>
    );
};
