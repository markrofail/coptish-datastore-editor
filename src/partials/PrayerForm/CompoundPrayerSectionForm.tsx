import { CompoundPrayerSection, Occasion } from "@/types";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { OccasionForm } from "../../components/OccasionForm";

interface CompoundPrayerSectionProps {
    section: CompoundPrayerSection;
    onChange: (updatedSection: CompoundPrayerSection) => void;
}

export const CompoundPrayerSectionComponent = ({ section, onChange }: CompoundPrayerSectionProps) => {
    const t = useTranslations("CompoundPrayerSection");

    const handleOccasionChange = (value: Occasion | undefined) => {
        onChange({ ...section, occasion: value });
    };

    return (
        <>
            {/* Occasion Field */}
            <OccasionForm value={section.occasion} onChange={handleOccasionChange} />
            {/* PrayerPath Field */}
            <TextField
                label={t("path-field-label")}
                value={section.path}
                onChange={(e) => onChange({ ...section, path: e.target.value })}
                fullWidth
            />
        </>
    );
};
