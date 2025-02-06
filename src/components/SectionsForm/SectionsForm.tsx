import React, { Fragment } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Prayer } from "@/app/types";
import { CompoundPrayerSectionComponent } from "./CompoundPrayerSectionForm";
import { InfoSectionComponent } from "./InfoSectionForm";
import { ReadingSectionComponent, ReadingType } from "./ReadingSectionForm";
import { VersesSectionComponent } from "./VersesSectionForm";

export type Section = Required<Prayer>["sections"][number];

interface SectionsProps {
  sections: Section[] | undefined;
  onChange: (newSections: Section[]) => void;
  onDelete: (index: number) => void;
}

export const SectionsForm: React.FC<SectionsProps> = ({
  sections,
  onChange,
  onDelete,
}) => {
  const handleChange = (index: number, updatedSection: Section) => {
    const newSections = [...(sections || [])];
    newSections[index] = updatedSection;
    onChange(newSections);
  };

  const handleSectionTypeChange = (sectionIndex: number, newType: string) => {
    const newSections = [...(sections || [])];
    const currentSection = newSections[sectionIndex];

    // Preserve common properties (occasion)
    const commonProps = { occasion: currentSection.occasion };

    let newSection: Section;
    switch (newType) {
      case "verses":
        newSection = {
          type: "verses",
          verses: [{ english: "" }],
          ...commonProps,
        };
        break;
      case "info":
        newSection = { type: "info", text: { english: "" }, ...commonProps };
        break;
      case "reading":
        newSection = {
          type: "reading",
          readingType: ReadingType.ActsOfTheApostles,
          ...commonProps,
        };
        break;
      case "compound-prayer":
        newSection = { type: "compound-prayer", path: "", ...commonProps };
        break;
      default:
        return; // Or handle the default case as needed
    }

    newSections[sectionIndex] = newSection;
    onChange(newSections);
  };

  return (
    <>
      {sections?.map((section, sectionIndex) => (
        <Fragment key={sectionIndex}>
          <Box sx={{ border: "1px solid #ccc", p: 2, gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="section-type-label">Section Type</InputLabel>
                <Select
                  labelId="section-type-label"
                  id="section-type"
                  value={section.type}
                  label="Section Type"
                  onChange={(e) =>
                    handleSectionTypeChange(
                      sectionIndex,
                      e.target.value as string
                    )
                  }
                >
                  <MenuItem value="verses">Verses</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="reading">Reading</MenuItem>
                  <MenuItem value="compound-prayer">Compound Prayer</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {section.type === "verses" && (
              <VersesSectionComponent
                section={section}
                onChange={(updatedSection) =>
                  handleChange(sectionIndex, updatedSection)
                }
              />
            )}

            {section.type === "info" && (
              <InfoSectionComponent
                section={section}
                onChange={(updatedSection) =>
                  handleChange(sectionIndex, updatedSection)
                }
              />
            )}

            {section.type === "reading" && (
              <ReadingSectionComponent
                section={section}
                onChange={(updatedSection) =>
                  handleChange(sectionIndex, updatedSection)
                }
              />
            )}

            {section.type === "compound-prayer" && (
              <CompoundPrayerSectionComponent
                section={section}
                onChange={(updatedSection) =>
                  handleChange(sectionIndex, updatedSection)
                }
              />
            )}
          </Box>

          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(sectionIndex)}
          >
            Delete Section
          </Button>
        </Fragment>
      ))}
    </>
  );
};
