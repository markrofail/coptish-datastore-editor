import { VersesSection, MultiLingualText } from "@/app/types";
import { Box, Button, IconButton } from "@mui/material";
import { MultiLingualTextForm } from "../MultiLingualTextForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface VersesSectionProps {
  section: VersesSection;
  onChange: (updatedSection: VersesSection) => void;
}

export const VersesSectionComponent: React.FC<VersesSectionProps> = ({
  section,
  onChange,
}) => {
  const handleMultiLingualTextChange = (
    verseIndex: number,
    newValue: MultiLingualText
  ) => {
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
      {/* ... speaker, saint, inaudible, occasion fields (using MUI components) */}
      {section.verses.map((verse, verseIndex) => (
        <Box
          key={verseIndex}
          sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}
        >
          <Box
            key={verseIndex}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
              mb: 1,
            }}
          >
            {/* Flexbox for horizontal alignment */}
            <MultiLingualTextForm
              value={verse}
              onChange={(newValue) =>
                handleMultiLingualTextChange(verseIndex, newValue)
              }
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
      <IconButton
        aria-label="add verse"
        onClick={handleAddVerse}
        color="primary"
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
