import React from "react";
import _ from "lodash";
import { OccasionForm } from "@/components/OccasionForm";
import { Section, SectionsForm } from "@/components/SectionsForm";
import { Box, Typography } from "@mui/material";
import { MultiLingualText, Prayer, Root } from "@/types";
import { useTranslations } from "next-intl";

interface PrayerFormProps {
    formData: Prayer;
    languages: (keyof MultiLingualText)[];
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
}

export const PrayerForm = ({ formData, languages, setFormData }: PrayerFormProps) => {
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
        setFormData((prevData: Prayer) => ({
            ...prevData,
            sections: [...(prevData.sections || []), newSection],
        }));
    };

    const handleSectionsChange = (newSections: Section[]) => {
        setFormData((prevData) => ({ ...prevData, sections: newSections }));
    };

    const handleDeleteSection = (index: number) => {
        setFormData((prevData: Prayer) => ({
            ...prevData,
            sections: prevData.sections?.filter((_, i) => i !== index),
        }));
    };

    return (
        <>
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
                    languages={languages}
                    onChange={handleSectionsChange}
                    onDelete={handleDeleteSection}
                    onAdd={handleAddSection}
                />
            </Box>
        </>
    );
};
