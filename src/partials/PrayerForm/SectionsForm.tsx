import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography, IconButton, ButtonGroup, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { MultiLingualText, Prayer, ReadingTypeEnum } from "@/types";
import { CompoundPrayerSectionComponent } from "./CompoundPrayerSectionForm";
import { InfoSectionComponent } from "./InfoSectionForm";
import { ReadingSectionComponent } from "./ReadingSectionForm";
import { VersesSectionComponent } from "./VersesSectionForm";
import { useTranslations } from "next-intl";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";

export type Section = Required<Prayer>["sections"][number];

interface SectionsProps {
    sections: Section[] | undefined;
    languages: (keyof MultiLingualText)[];
    onChange: (newSections: Section[]) => void;
    onDelete: (index: number) => void;
    onAdd: () => void;
}

export const SectionsForm = ({ sections, languages, onChange, onDelete, onAdd }: SectionsProps) => {
    const t = useTranslations("SectionsForm");
    const [parent] = useAutoAnimate();

    const [sectionIds, setSectionIds] = useState<string[]>([]);
    useEffect(() => {
        const initialIds = sections?.map((_, index) => sectionIds[index] || uuidv4()) || [];
        setSectionIds(initialIds);
    }, [sections, sectionIds]);

    const moveSectionUp = (index: number) => {
        if (!sections || index === 0) return;

        const newSections = [...sections];
        const tempSection = newSections[index];
        newSections[index] = newSections[index - 1];
        newSections[index - 1] = tempSection;
        onChange(newSections);

        const newSectionIds = { ...sectionIds };
        const tempId = newSectionIds[index];
        newSectionIds[index] = newSectionIds[index - 1];
        newSectionIds[index - 1] = tempId;
        setSectionIds(newSectionIds);
    };

    const moveSectionDown = (index: number) => {
        if (!sections || index === sections.length - 1) return;

        const newSections = [...sections];
        const tempSection = newSections[index];
        newSections[index] = newSections[index + 1];
        newSections[index + 1] = tempSection;
        onChange(newSections);

        const newSectionIds = { ...sectionIds };
        const tempId = newSectionIds[index];
        newSectionIds[index] = newSectionIds[index + 1];
        newSectionIds[index + 1] = tempId;
        setSectionIds(newSectionIds);
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
                newSection = { type: "verses", verses: {}, ...commonProps };
                break;
            case "info":
                newSection = { type: "info", text: {}, ...commonProps };
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

    const handleAddSection = () => {
        onAdd();
        setSectionIds([...sectionIds, uuidv4()]);
    };

    const handleDeleteSection = (index: number) => {
        onDelete(index);
        setSectionIds(sectionIds.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} ref={parent}>
            {sections?.map((section, sectionIndex) => (
                <Fragment key={sectionIds[sectionIndex] || sectionIndex}>
                    <Box sx={{ border: "1px solid #ccc" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h6">{t("section-label", { index: sectionIndex + 1 })}</Typography>

                                <ButtonGroup>
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

                                    <IconButton
                                        onClick={() => handleDeleteSection(sectionIndex)}
                                        size="small"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ButtonGroup>
                            </Box>

                            <Box>
                                <ToggleButtonGroup
                                    value={section.type}
                                    onChange={(_, value) => handleSectionTypeChange(sectionIndex, value)}
                                    color="primary"
                                    fullWidth
                                    exclusive
                                >
                                    {["verses", "info", "reading", "compound-prayer"].map((type) => (
                                        <ToggleButton key={type} value={type}>
                                            {t(`sectionType-field-option-${type}`)}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Box>

                            {section.type === "verses" && (
                                <VersesSectionComponent
                                    section={section}
                                    languages={languages}
                                    onChange={(updatedSection) => handleChange(sectionIndex, updatedSection)}
                                />
                            )}
                            {section.type === "info" && (
                                <InfoSectionComponent
                                    section={section}
                                    languages={languages}
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
                    </Box>
                </Fragment>
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button variant="contained" onClick={handleAddSection} endIcon={<AddIcon />}>
                    {t("addSections-button-label")}
                </Button>
            </Box>
        </Box>
    );
};
