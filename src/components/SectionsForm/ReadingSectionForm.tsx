import { ReadingSection } from "@/app/types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export enum ReadingType {
  ActsOfTheApostles = "acts-of-the-apostles",
  CatholicEpistle = "catholic-epistle",
  LiturgyGospel = "liturgy-gospel",
  LiturgyPsalm = "liturgy-psalm",
  MatinsGospel = "matins-gospel",
  MatinsPsalm = "matins-psalm",
  PaulineEpistle = "pauline-epistle",
  Synaxarium = "synaxarium",
  VespersGospel = "vespers-gospel",
  VespersPsalm = "vespers-psalm",
}

interface ReadingSectionProps {
  section: ReadingSection;
  onChange: (updatedSection: ReadingSection) => void;
}

export const ReadingSectionComponent: React.FC<ReadingSectionProps> = ({
  section,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="reading-type-label">Reading Type</InputLabel>
      <Select
        labelId="reading-type-label"
        id="readingType"
        value={section.readingType}
        label="Reading Type"
        onChange={(e) =>
          onChange({ ...section, readingType: e.target.value as ReadingType })
        }
      >
        {Object.values(ReadingType).map((rt) => (
          <MenuItem key={rt} value={rt}>
            {rt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
