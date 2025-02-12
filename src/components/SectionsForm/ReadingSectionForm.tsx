import { ReadingSection, ReadingTypeEnum } from "@/app/types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface ReadingSectionProps {
    section: ReadingSection;
    onChange: (updatedSection: ReadingSection) => void;
}

export const ReadingSectionComponent = ({ section, onChange }: ReadingSectionProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="reading-type-label">Reading Type</InputLabel>
            <Select
                labelId="reading-type-label"
                id="readingType"
                value={section.readingType}
                label="Reading Type"
                onChange={(e) => onChange({ ...section, readingType: e.target.value as ReadingTypeEnum })}
            >
                {Object.entries(ReadingTypeEnum).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {key}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
