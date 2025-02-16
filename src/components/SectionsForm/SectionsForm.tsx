import React, { Fragment, useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    IconButton,
    ButtonGroup,
    Button,
    Tab,
    Tabs,
} from "@mui/material";
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
import { v4 as uuidv4 } from "uuid";

export type Section = Required<Prayer>["sections"][number];

interface SectionsProps {
    sections: Section[] | undefined;
    onChange: (newSections: Section[]) => void;
    onDelete: (index: number) => void;
    onAdd: () => void;
}

export const SectionsForm = ({ sections, onChange, onDelete, onAdd }: SectionsProps) => {
    const t = useTranslations("SectionsForm");
    const [parent] = useAutoAnimate();

    const [sectionIds, setSectionIds] = useState<string[]>([]);
    React.useEffect(() => {
        const initialIds = sections?.map((_, index) => sectionIds[index] || uuidv4()) || [];
        setSectionIds(initialIds);
    }, [sections]);

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
                <Fragment key={sectionIds[sectionIndex]}>
                    <Box sx={{ border: "1px solid #ccc" }}>
                        <Tabs
                            variant="fullWidth"
                            value={section.type}
                            onChange={(_, newType) => handleSectionTypeChange(sectionIndex, newType)}
                        >
                            {["verses", "info", "reading", "compound-prayer"].map((type) => (
                                <Tab value={type} label={t(`sectionType-field-option-${type}`)} />
                            ))}
                        </Tabs>

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

                                    <IconButton onClick={() => onDelete(sectionIndex)} size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </ButtonGroup>
                            </Box>

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
                    </Box>
                </Fragment>
            ))}

            <Button variant="contained" onClick={onAdd}>
                {t("addSections-button-label")}
            </Button>
        </Box>
    );
};
