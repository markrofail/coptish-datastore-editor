import {
    type VersesSection,
    type MultiLingualText,
    type Saint,
    type Speaker,
    SaintEnum,
    SpeakerEnum,
} from "@/app/types";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { MultiLingualTextForm } from "../MultiLingualTextForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface VersesSectionProps {
    section: VersesSection;
    error?: string;
    onChange: (updatedSection: VersesSection) => void;
}

export const VersesSectionComponent = ({ section, onChange }: VersesSectionProps) => {
    const handleSpeakerChange = (event: SelectChangeEvent<SpeakerEnum>) => {
        onChange({ ...section, speaker: event.target.value as Speaker });
    };

    const handleSaintChange = (event: SelectChangeEvent<SaintEnum>) => {
        onChange({ ...section, saint: event.target.value as Saint });
    };

    const handleInaudibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...section, inaudible: event.target.checked });
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
            {/* Speaker Field */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="speaker-label">Speaker</InputLabel>
                <Select
                    labelId="speaker-label"
                    id="speaker"
                    value={section.speaker as unknown as SpeakerEnum}
                    label="Speaker"
                    onChange={handleSpeakerChange}
                >
                    <MenuItem value="">Select Speaker</MenuItem>
                    {Object.entries(SpeakerEnum).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* InAudible Field */}
            <FormControlLabel
                control={<Checkbox checked={section.inaudible || false} onChange={handleInaudibleChange} />}
                label="Inaudible"
            />

            {/* Saint Field */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="saint-label">Saint</InputLabel>
                <Select
                    labelId="saint-label"
                    id="saint"
                    value={section.saint as unknown as SaintEnum}
                    label="Saint"
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

            {/* Verses Field */}
            <Box>
                <Typography variant="subtitle2">Verses</Typography>
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
                {/* Plus icon button */}
                <IconButton aria-label="add verse" onClick={handleAddVerse} color="primary">
                    <AddIcon />
                </IconButton>
            </Box>
        </>
    );
};
