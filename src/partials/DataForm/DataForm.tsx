import React from "react";
import _ from "lodash";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { OccasionForm } from "@/components/OccasionForm";
import { Section, SectionsForm } from "@/components/SectionsForm";
import { Box, TextField, Typography } from "@mui/material";
import { Prayer } from "@/types";
import { useTranslations } from "next-intl";
import { Header } from "../Header";

interface DataFormProps {
    formData: Prayer;
    setFormData: React.Dispatch<React.SetStateAction<Prayer>>;
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export const DataForm = ({ formData, setFormData, fileName, setFileName }: DataFormProps) => {
    const t = useTranslations();

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleChange = (path: string, value: any) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, path, value);
            return newData;
        });
    };

    const handleAddSection = () => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newSection: any = { type: "verses" };
        if (newSection.type === "verses") newSection.verses = [{ english: "" }];
        if (newSection.type === "info") newSection.text = { english: "" };
        if (newSection.type === "compound-prayer") newSection.path = "";
        setFormData((prevData) => ({
            ...prevData,
            sections: [...(prevData.sections || []), newSection],
        }));
    };

    const handleSectionsChange = (newSections: Section[]) => {
        setFormData((prevData) => ({ ...prevData, sections: newSections }));
    };

    const handleDeleteSection = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            sections: prevData.sections?.filter((_, i) => i !== index),
        }));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Header formData={formData} setFormData={setFormData} fileName={fileName} setFileName={setFileName} />

            {/* Filename input */}
            <TextField
                label={t("fileName-field-label")}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                fullWidth
            />

            {/* Title */}
            <Box>
                <Typography variant="h6">{t("title-field-label")}</Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(newValue) => handleChange("title", newValue)}
                />
            </Box>

            {/* Occasion */}
            <Box>
                <Typography variant="h6">{t("occasion-field-label")}</Typography>
                <OccasionForm value={formData.occasion} onChange={(newValue) => handleChange("occasion", newValue)} />
            </Box>

            {/* Sections */}
            <Box>
                <Typography variant="h6">{t("sections-field-label")}</Typography>
                <SectionsForm
                    sections={formData.sections}
                    onChange={handleSectionsChange}
                    onDelete={handleDeleteSection}
                    onAdd={handleAddSection}
                />
            </Box>
        </Box>
    );
};
