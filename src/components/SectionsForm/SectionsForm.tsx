import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, IconButton, ButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { Prayer, ReadingTypeEnum } from "@/types";
import { CompoundPrayerSectionComponent } from "./CompoundPrayerSectionForm";
import { InfoSectionComponent } from "./InfoSectionForm";
import { ReadingSectionComponent } from "./ReadingSectionForm";
import { VersesSectionComponent } from "./VersesSectionForm";
import { useTranslations } from "next-intl";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export type Section = Required<Prayer>["sections"][number];

interface SectionsProps {
    sections: Section[] | undefined;
    onChange: (newSections: Section[]) => void;
    onDelete: (index: number) => void;
}

export const SectionsForm = ({ sections, onChange, onDelete }: SectionsProps) => {
    const t = useTranslations("SectionsForm");
    const [parent] = useAutoAnimate();

    const moveSectionUp = (index: number) => {
        if (sections && index > 0) {
            const newSections = [...sections];
            const temp = newSections[index];
            newSections[index] = newSections[index - 1];
            newSections[index - 1] = temp;
            onChange(newSections);
        }
    };

    const moveSectionDown = (index: number) => {
        if (sections && index < sections.length - 1) {
            const newSections = [...sections];
            const temp = newSections[index];
            newSections[index] = newSections[index + 1];
            newSections[index + 1] = temp;
            onChange(newSections);
        }
    };

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} ref={parent}>
            {sections?.map((section, sectionIndex) => (
                <Box key={JSON.stringify(section)} sx={{ border: "1px solid #ccc", p: 2, gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 2,
                        }}
                    >
                        <Typography variant="h6">{t("section-label", { index: sectionIndex + 1 })}</Typography>

                        <ButtonGroup variant="contained">
                            <IconButton
                                onClick={() => moveSectionUp(sectionIndex)}
                                disabled={sectionIndex === 0}
                                size="small"
                            >
                                <ArrowUpwardIcon />
                            </IconButton>

                            <IconButton
                                onClick={() => moveSectionDown(sectionIndex)}
                                disabled={sectionIndex === sections.length - 1}
                                size="small"
                            >
                                <ArrowDownwardIcon />
                            </IconButton>

                            <IconButton onClick={() => onDelete(sectionIndex)} size="small" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Box>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="section-type-label">{t("sectionType-field-label")}</InputLabel>
                        <Select
                            labelId="section-type-label"
                            id="section-type"
                            value={section.type}
                            label="Section Type"
                            onChange={(e) => handleSectionTypeChange(sectionIndex, e.target.value as string)}
                        >
                            {["verses", "info", "reading", "compound-prayer"].map((type) => (
                                <MenuItem key={type} value={type}>
                                    {t(`sectionType-field-option-${type}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
            ))}
        </Box>
    );
};
