import { CompoundPrayerSection } from "@/app/types";
import { TextField } from "@mui/material";

interface CompoundPrayerSectionProps {
  section: CompoundPrayerSection;
  onChange: (updatedSection: CompoundPrayerSection) => void;
}

export const CompoundPrayerSectionComponent: React.FC<
  CompoundPrayerSectionProps
> = ({ section, onChange }) => {
  return (
    <TextField
      label="Path"
      value={section.path}
      onChange={(e) => onChange({ ...section, path: e.target.value })}
      fullWidth
    />
  );
};
