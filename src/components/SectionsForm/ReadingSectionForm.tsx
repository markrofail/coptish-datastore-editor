import { Occasion, ReadingSection, ReadingTypeEnum } from "@/types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { OccasionForm } from "../OccasionForm";

interface ReadingSectionProps {
    section: ReadingSection;
    onChange: (updatedSection: ReadingSection) => void;
}

export const ReadingSectionComponent = ({ section, onChange }: ReadingSectionProps) => {
    const t = useTranslations("ReadingSection");

    const handleOccasionChange = (value: Occasion | undefined) => {
        onChange({ ...section, occasion: value });
    };

    return (
        <>
            {/* Occasion Field */}
            <OccasionForm value={section.occasion} onChange={handleOccasionChange} />

            {/* ReadingType Field */}
            <FormControl fullWidth>
                <InputLabel id="reading-type-label">{t("readingType-field-label")}</InputLabel>
                <Select
                    labelId="reading-type-label"
                    id="readingType"
                    value={section.readingType}
                    label={t("readingType-field-label")}
                    onChange={(e) => onChange({ ...section, readingType: e.target.value as ReadingTypeEnum })}
                >
                    {Object.entries(ReadingTypeEnum).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {t(`readingType-field-option-${value}`)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};
