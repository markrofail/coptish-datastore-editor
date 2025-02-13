import { ReadingSection, ReadingTypeEnum } from "@/types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";

interface ReadingSectionProps {
    section: ReadingSection;
    onChange: (updatedSection: ReadingSection) => void;
}

export const ReadingSectionComponent = ({ section, onChange }: ReadingSectionProps) => {
    const t = useTranslations("ReadingSection");

    return (
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
    );
};
