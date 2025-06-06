import React, { useEffect, useState } from "react";
import _ from "lodash";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { Prayer, Reading, Root } from "@/types";
import { useTranslations } from "next-intl";
import { Header } from "../Header";
import { PrayerForm } from "./PrayerForm";
import { ReadingV2Form } from "./ReadingV2Form";

const LANGUAGES = ["english", "arabic", "coptic", "coptic_english", "coptic_arabic"] as const;
type Language = (typeof LANGUAGES)[number];

const isPrayerT = (formData: Root): formData is Prayer => formData.hasOwnProperty("sections");
const isReadingT = (formData: Root): formData is Reading => formData.hasOwnProperty("liturgy-gospel");

interface DataFormProps {
    formData: Root;
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export const DataForm = ({ formData, setFormData, fileName, setFileName }: DataFormProps) => {
    const t = useTranslations("DataForm");
    const [formType, setFormType] = useState<"prayer" | "reading" | "synaxarium">("prayer");
    const [language1, setLanguage1] = React.useState<Language>("english");
    const [language2, setLanguage2] = React.useState<Language>("arabic");

    const isPrayer = isPrayerT(formData);
    const isReading = isReadingT(formData);

    useEffect(() => {
        console.log(formData);
        if (isPrayer || isReading) {
            if (isPrayer) setFormType("prayer");
            else if (isReading) setFormType("reading");
        } else {
            setFormType("prayer"); // default
        }
    }, [isPrayer, isReading]);

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleChange = (path: string, value: any) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, path, value);
            return newData;
        });
    };

    const onFormTypeChange = (value: "prayer" | "reading" | "synaxarium") => {
        setFormType(value);

        const commonProps = { title: formData.title };

        switch (value) {
            case "prayer":
                setFormData({ ...commonProps, sections: [] });
                break;
            case "reading":
                setFormData({ ...commonProps });
                break;
        }
    };

    const handleChange1 = (event: SelectChangeEvent) => {
        setLanguage1(event.target.value as Language);
    };

    const handleChange2 = (event: SelectChangeEvent) => {
        setLanguage2(event.target.value as Language);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Header formData={formData} setFormData={setFormData} fileName={fileName} setFileName={setFileName} />

            {/* Filename input */}
            <TextField
                label={t("fileName-field-label")}
                value={fileName}
                dir="ltr"
                onChange={(e) => setFileName(e.target.value)}
                fullWidth
            />

            <Box>
                <Typography variant="h6">Language</Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="language1-select-label">Language 1</InputLabel>
                        <Select
                            labelId="language1-select-label"
                            id="language1-select"
                            value={language1}
                            label="Language 1"
                            onChange={handleChange1}
                            fullWidth
                        >
                            {LANGUAGES.map((lang) => (
                                <MenuItem key={lang} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="language2-select-label">Language 2</InputLabel>
                        <Select
                            labelId="language2-select-label"
                            id="language2-select"
                            value={language2}
                            label="Language 2"
                            onChange={handleChange2}
                            fullWidth
                        >
                            {LANGUAGES.map((lang) => (
                                <MenuItem key={lang} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Title */}
            <Box>
                <Typography variant="h6">{t("title-field-label")}</Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(value) => handleChange("title", value)}
                    languages={[language1, language2]}
                />
            </Box>

            {/* InAudible Field */}
            <Box>
                <Typography variant="h6">{t("formType-field-label")}</Typography>
                <ToggleButtonGroup
                    value={formType}
                    onChange={(_, value) => onFormTypeChange(value)}
                    color="primary"
                    fullWidth
                    exclusive
                >
                    {["prayer", "reading"].map((type) => (
                        <ToggleButton key={type} value={type}>
                            {t(`formType-field-option-${type}`)}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            {formType === "prayer" && (
                <PrayerForm
                    formData={formData as Prayer}
                    setFormData={setFormData}
                    languages={[language1, language2]}
                />
            )}
            {formType === "reading" && (
                <ReadingV2Form
                    formData={formData as Reading}
                    setFormData={setFormData}
                    languages={[language1, language2]}
                />
            )}
        </Box>
    );
};
