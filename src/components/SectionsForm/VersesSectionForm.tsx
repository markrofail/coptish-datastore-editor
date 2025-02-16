import {
    type VersesSection,
    type MultiLingualText,
    type Saint,
    type Speaker,
    SaintEnum,
    SpeakerEnum,
    Occasion,
} from "@/types";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { MultiLingualTextForm } from "../MultiLingualTextForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { OccasionForm } from "../OccasionForm";

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

    const handleMultiLingualTextChange = (verseIndex: number, newValue: MultiLingualText) => {
        const newVerses = [...section.verses];
        newVerses[verseIndex] = newValue;
        onChange({ ...section, verses: newVerses });
    };

    const handleAddVerse = () => {
        onChange({ ...section, verses: [...section.verses, { english: "" }] });
    };

    const handleDeleteVerse = (verseIndex: number) => {
        const newVerses = section.verses.filter((_, i) => i !== verseIndex);
        onChange({ ...section, verses: newVerses });
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 2 }}>
                {/* Occasion Field */}
                <OccasionForm value={section.occasion} onChange={handleOccasionChange} />

                {/* Saint Field */}
                <FormControl fullWidth>
                    <InputLabel id="saint-label">{t("saint-field-label")}</InputLabel>
                    <Select
                        labelId="saint-label"
                        id="saint"
                        value={section.saint as unknown as SaintEnum}
                        label={t("saint-field-label")}
                        onChange={handleSaintChange}
                    >
                        <MenuItem value="">Select Saint</MenuItem>
                        {Object.entries(SaintEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 2 }}>
                {/* Speaker Field */}
                <FormControl fullWidth>
                    <InputLabel id="speaker-label">{t("speaker-field-label")}</InputLabel>
                    <Select
                        labelId="speaker-label"
                        id="speaker"
                        value={section.speaker as unknown as SpeakerEnum}
                        label={t("speaker-field-label")}
                        onChange={handleSpeakerChange}
                    >
                        {Object.entries(SpeakerEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {key}
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
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="h6">{t("verses-field-label")}</Typography>

                    {/* Plus icon button */}
                    <IconButton aria-label="add verse" onClick={handleAddVerse} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>

                {section.verses?.map((verse, verseIndex) => (
                    <Box key={verseIndex} sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}>
                        <Box
                            key={verseIndex}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                mb: 1,
                            }}
                        >
                            {/* Flexbox for horizontal alignment */}
                            <MultiLingualTextForm
                                value={verse}
                                onChange={(newValue) => handleMultiLingualTextChange(verseIndex, newValue)}
                                multiline
                            />
                            <Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDeleteVerse(verseIndex)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};
