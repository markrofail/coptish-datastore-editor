import { CompoundPrayerSection } from "@/types";
import { TextField } from "@mui/material";

interface CompoundPrayerSectionProps {
    section: CompoundPrayerSection;
    onChange: (updatedSection: CompoundPrayerSection) => void;
}

export const CompoundPrayerSectionComponent = ({ section, onChange }: CompoundPrayerSectionProps) => {
    return (
        <TextField
            label="Path"
            value={section.path}
            onChange={(e) => onChange({ ...section, path: e.target.value })}
            fullWidth
        />
    );
};
