import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { MultiLingualText, Reading, Root } from "@/types";
import { useTranslations } from "next-intl";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";

interface ReadingFormProps {
    formData: Reading;
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
}

export const ReadingForm = ({ formData, setFormData }: ReadingFormProps) => {
    const t = useTranslations("ReadingForm");

    const handleMultiLingualTextChange = (verseIndex: number, newValue: MultiLingualText) => {
        const newVerses = [...formData.text];
        newVerses[verseIndex] = newValue;
        setFormData({ ...formData, text: newVerses });
    };

    const handleAddParagraph = () => {
        setFormData({ ...formData, text: [...formData.text, { english: "" }] });
    };

    const handleDeleteParagraph = (targetIndex: number) => {
        const newVerses = formData.text.filter((_, i) => i !== targetIndex);
        setFormData({ ...formData, text: newVerses });
    };

    return (
        <>
            {/* Verses Field */}
            <Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="h6">{t("text-field-label")}</Typography>

                    {/* Plus icon button */}
                    <IconButton aria-label="add verse" onClick={handleAddParagraph} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>

                {formData.text?.map((paragraph, index) => (
                    <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                mb: 1,
                            }}
                        >
                            <MultiLingualTextForm
                                value={paragraph}
                                onChange={(value) => handleMultiLingualTextChange(index, value)}
                                languages={["english", "arabic", "coptic"]}
                                multiline
                            />
                            <Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDeleteParagraph(index)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};
