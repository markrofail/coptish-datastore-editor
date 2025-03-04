import { type VersesSection, type Saint, type Speaker, SaintEnum, SpeakerEnum, Occasion } from "@/types";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { OccasionForm } from "../OccasionForm";
import { MultiLingualTextArrayForm } from "../MultiLingualTextArrayForm";

interface VersesSectionProps {
    section: VersesSection;
    error?: string;
    onChange: (updatedSection: VersesSection) => void;
}

export const VersesSectionComponent = ({ section, onChange }: VersesSectionProps) => {
    const t = useTranslations("VersesSection");

    const handleSpeakerChange = (event: SelectChangeEvent<SpeakerEnum>) => {
        onChange({ ...section, speaker: event.target.value as Speaker });
    };

    const handleSaintChange = (event: SelectChangeEvent<SaintEnum>) => {
        onChange({ ...section, saint: event.target.value as Saint });
    };

    const handleInaudibleChange = (_: React.MouseEvent<HTMLElement>, value: boolean) => {
        onChange({ ...section, inaudible: value });
    };

    const handleOccasionChange = (value: Occasion | undefined) => {
        onChange({ ...section, occasion: value });
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 1 }}>
                {/* Occasion Field */}
                <OccasionForm value={section.occasion} onChange={handleOccasionChange} />

                {/* Saint Field */}
                <FormControl fullWidth>
                    <InputLabel id="saint-label">{t("saint-field-label")}</InputLabel>
                    <Select
                        labelId="saint-label"
                        id="saint"
                        value={(section.saint as unknown as SaintEnum) || ""}
                        label={t("saint-field-label")}
                        onChange={handleSaintChange}
                    >
                        <MenuItem value="" />
                        {Object.entries(SaintEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 1 }}>
                {/* Speaker Field */}
                <FormControl fullWidth>
                    <InputLabel id="speaker-label">{t("speaker-field-label")}</InputLabel>
                    <Select
                        labelId="speaker-label"
                        id="speaker"
                        value={(section.speaker as unknown as SpeakerEnum) || ""}
                        label={t("speaker-field-label")}
                        onChange={handleSpeakerChange}
                    >
                        <MenuItem value="" />
                        {Object.entries(SpeakerEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {t(`speaker-field-option-${value}`) || value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* InAudible Field */}
                <ToggleButtonGroup value={section.inaudible} onChange={handleInaudibleChange} color="primary" exclusive>
                    <ToggleButton value={false}>{t("inaudible-field-off")}</ToggleButton>
                    <ToggleButton value={true}>{t("inaudible-field-on")}</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Verses Field */}
            <Box>
                <Typography variant="h6">{t("verses-field-label")}</Typography>

                <MultiLingualTextArrayForm
                    value={section.verses}
                    onChange={(newValue) => onChange({ ...section, verses: newValue })}
                    multiline
                />
            </Box>
        </>
    );
};
