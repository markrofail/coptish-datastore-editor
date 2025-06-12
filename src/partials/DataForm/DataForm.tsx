import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { PrayerForm } from "../PrayerForm";
import { ReadingForm } from "./ReadingForm";

const LANGUAGES = ["english", "arabic", "coptic", "coptic_english", "coptic_arabic"] as const;
type Language = (typeof LANGUAGES)[number];

const FORM_TYPES = ["prayer", "reading", "synaxarium"] as const;
type FormType = (typeof FORM_TYPES)[number];

const LABEL_MAP = (t: (id: string) => string) => ({
    english: t("language-field-option-english"),
    arabic: t("language-field-option-arabic"),
    coptic: t("language-field-option-coptic"),
    coptic_english: t("language-field-option-copticEnglish"),
    coptic_arabic: t("language-field-option-copticArabic"),
});

const isPrayerT = (formData: Root): formData is Prayer => formData.hasOwnProperty("sections");
const isReadingT = (formData: Root): formData is Reading => formData.hasOwnProperty("liturgy-gospel");

interface DataFormProps {
    formData: Root;
    setFormData: Dispatch<SetStateAction<Root>>;
    fileName: string;
    setFileName: Dispatch<SetStateAction<string>>;
}

export const DataForm = ({ formData, setFormData, fileName, setFileName }: DataFormProps) => {
    const t = useTranslations("DataForm");
    const [formType, setFormType] = useState<FormType>("prayer");
    const [language1, setLanguage1] = useState<Language>("english");
    const [language2, setLanguage2] = useState<Language>("arabic");

    const isPrayer = isPrayerT(formData);
    const isReading = isReadingT(formData);

    useEffect(() => {
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

    const onFormTypeChange = (value: FormType) => {
        setFormType(value);

        const commonProps = { title: formData.title || {} };
        switch (value) {
            case "prayer":
                const prayer: Prayer = { ...commonProps, sections: [] };
                setFormData(prayer);
                break;
            case "reading":
                const reading: Reading = { ...commonProps };
                setFormData(reading);
                break;
        }
    };

    const handleLanguageChange = (language: "left" | "right") => (event: SelectChangeEvent) => {
        if (language === "left") setLanguage1(event.target.value as Language);
        else setLanguage2(event.target.value as Language);
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

            {/* Title */}
            <Box>
                <Typography variant="h6">{t("title-field-label")}</Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(value) => handleChange("title", value)}
                    languages={[language1, language2]}
                />
            </Box>

            {/* Language input */}
            <Box>
                <Typography variant="h6">{t("language-field-label")}</Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    {(
                        [
                            { pos: "left", value: language1 },
                            { pos: "right", value: language2 },
                        ] as const
                    ).map(({ pos, value }) => (
                        <FormControl key={pos} sx={{ minWidth: 120 }} fullWidth>
                            <InputLabel id={`${pos}-select-label`}>{t("language-field-label")}</InputLabel>
                            <Select
                                labelId={`${pos}-select-label`}
                                id={`${pos}-select`}
                                value={value}
                                label={`${pos}`}
                                onChange={handleLanguageChange(pos)}
                                fullWidth
                            >
                                {LANGUAGES.map((lang) => (
                                    <MenuItem key={lang} value={lang}>
                                        {LABEL_MAP(t)[lang]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                </Box>
            </Box>

            {/* FormType Field */}
            <Box>
                <Typography variant="h6">{t("formType-field-label")}</Typography>
                <ToggleButtonGroup
                    value={formType}
                    onChange={(_, value) => onFormTypeChange(value)}
                    color="primary"
                    fullWidth
                    exclusive
                >
                    {FORM_TYPES.map((type) => (
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
                <ReadingForm
                    formData={formData as Reading}
                    setFormData={setFormData}
                    languages={[language1, language2]}
                />
            )}
        </Box>
    );
};
