import React, { Fragment } from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Occasion, Prayer, ReadingTypeEnum } from "@/app/types";
import { CompoundPrayerSectionComponent } from "./CompoundPrayerSectionForm";
import { InfoSectionComponent } from "./InfoSectionForm";
import { ReadingSectionComponent } from "./ReadingSectionForm";
import { VersesSectionComponent } from "./VersesSectionForm";
import { OccasionForm } from "../OccasionForm";

export type Section = Required<Prayer>["sections"][number];

interface SectionsProps {
    sections: Section[] | undefined;
    onChange: (newSections: Section[]) => void;
    onDelete: (index: number) => void;
}

export const SectionsForm = ({ sections, onChange, onDelete }: SectionsProps) => {
    const handleChange = (index: number, updatedSection: Section) => {
        const newSections = [...(sections || [])];
        newSections[index] = updatedSection;
        onChange(newSections);
    };

    const handleOccasionChange = (sectionIndex: number, newOccasion: Occasion | undefined) => {
        const newSections = [...(sections || [])];
        newSections[sectionIndex] = { ...newSections[sectionIndex], occasion: newOccasion };
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
                    readingType: ReadingTypeEnum["Acts Of The Apostles"],
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="subtitle1" marginBottom={2}>
                                Section #{sectionIndex + 1}
                            </Typography>

                            <Button variant="contained" color="error" onClick={() => onDelete(sectionIndex)}>
                                Delete Section
                            </Button>
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel id="section-type-label">Section Type</InputLabel>
                            <Select
                                labelId="section-type-label"
                                id="section-type"
                                value={section.type}
                                label="Section Type"
                                onChange={(e) => handleSectionTypeChange(sectionIndex, e.target.value as string)}
                            >
                                <MenuItem value="verses">Verses</MenuItem>
                                <MenuItem value="info">Info</MenuItem>
                                <MenuItem value="reading">Reading</MenuItem>
                                <MenuItem value="compound-prayer">Compound Prayer</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Occasion Field */}
                        <OccasionForm
                            value={section.occasion}
                            onChange={(newOccasion) => handleOccasionChange(sectionIndex, newOccasion)}
                        />

                        {section.type === "verses" && (
                            <VersesSectionComponent
                                section={section}
                                onChange={(updatedSection) => handleChange(sectionIndex, updatedSection)}
                            />
                        )}
                        {section.type === "info" && (
                            <InfoSectionComponent
                                section={section}
                                onChange={(updatedSection) => handleChange(sectionIndex, updatedSection)}
                            />
                        )}
                        {section.type === "reading" && (
                            <ReadingSectionComponent
                                section={section}
                                onChange={(updatedSection) => handleChange(sectionIndex, updatedSection)}
                            />
                        )}
                        {section.type === "compound-prayer" && (
                            <CompoundPrayerSectionComponent
                                section={section}
                                onChange={(updatedSection) => handleChange(sectionIndex, updatedSection)}
                            />
                        )}
                    </Box>
                </Fragment>
            ))}
        </>
    );
};
