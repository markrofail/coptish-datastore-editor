import React, { Dispatch, SetStateAction } from "react";
import { OccasionForm } from "@/components/OccasionForm";
import { Section, SectionsForm } from "./SectionsForm";
import { Box, Typography } from "@mui/material";
import { MultiLingualText, OccasionEnum, Prayer, Root, VersesSection } from "@/types";
import { useTranslations } from "next-intl";

interface PrayerFormProps {
    formData: Prayer;
    languages: (keyof MultiLingualText)[];
    setFormData: Dispatch<SetStateAction<Root>>;
}

export const PrayerForm = ({ formData, languages, setFormData }: PrayerFormProps) => {
    const t = useTranslations();

    const handleOccasionChange = (value?: OccasionEnum) => {
        setFormData((prevData) => ({ ...prevData, occasion: value }));
    };

    const handleSectionsChange = (newSections: Section[]) => {
        setFormData((prevData) => ({ ...prevData, sections: newSections }));
    };

    const handleSectionAdd = () => {
        const newSection: VersesSection = { type: "verses", verses: { english: [""] } };
        setFormData((prevData: Prayer) => ({
            ...prevData,
            sections: [...(prevData.sections ?? []), newSection],
        }));
    };

    const handleSectionDelete = (index: number) => {
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
                <OccasionForm value={formData.occasion} onChange={handleOccasionChange} />
            </Box>

            {/* Sections */}
            <Box>
                <Typography variant="h6">{t("sections-field-label")}</Typography>
                <SectionsForm
                    sections={formData.sections}
                    languages={languages}
                    onChange={handleSectionsChange}
                    onDelete={handleSectionDelete}
                    onAdd={handleSectionAdd}
                />
            </Box>
        </>
    );
};
