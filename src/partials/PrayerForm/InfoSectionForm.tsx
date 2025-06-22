import { InfoSection, MultiLingualText, Occasion } from "@/types";
import { MultiLingualTextForm } from "../../components/MultiLingualTextForm";
import { OccasionForm } from "../../components/OccasionForm";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface InfoSectionProps {
    section: InfoSection;
    languages: (keyof MultiLingualText)[];
    onChange: (updatedSection: InfoSection) => void;
}

export const InfoSectionComponent = ({ section, languages, onChange }: InfoSectionProps) => {
    const t = useTranslations("InfoSection");

    const handleMultiLingualTextChange = (newValue: MultiLingualText) => {
        onChange({ ...section, text: newValue });
    };

    const handleOccasionChange = (value: Occasion | undefined) => {
        onChange({ ...section, occasion: value });
    };

    return (
        <>
            {/* Occasion Field */}
            <OccasionForm value={section.occasion} onChange={handleOccasionChange} />

            <Box>
                <Typography fontWeight="600" variant="h6">
                    {t("comment-field-label")}
                </Typography>

                {/* InfoText Field */}
                <MultiLingualTextForm
                    languages={languages}
                    value={section.text}
                    onChange={handleMultiLingualTextChange}
                    multiline
                />
            </Box>
        </>
    );
};
