import { CompoundPrayerSection } from "@/types";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

interface CompoundPrayerSectionProps {
    section: CompoundPrayerSection;
    onChange: (updatedSection: CompoundPrayerSection) => void;
}

export const CompoundPrayerSectionComponent = ({ section, onChange }: CompoundPrayerSectionProps) => {
    const t = useTranslations("CompoundPrayerSection");

    return (
        <TextField
            label={t("path-field-label")}
            value={section.path}
            onChange={(e) => onChange({ ...section, path: e.target.value })}
            fullWidth
        />
    );
};
