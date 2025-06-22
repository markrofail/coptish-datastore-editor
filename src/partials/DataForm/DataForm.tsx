import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import _ from "lodash";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { Box, Typography } from "@mui/material";
import { Prayer, Reading, Root } from "@/types";
import { useTranslations } from "next-intl";
import { PrayerForm } from "../PrayerForm";
import { ReadingForm } from "./ReadingForm";
import { Language, LanguageFields } from "./LanguageFields";
import { ToggleButton, ToggleButtonGroup } from "@/components/ToggleButton";
import { useLocalStorage } from "usehooks-ts";

const FORM_TYPES = ["prayer", "reading", "synaxarium"] as const;
type FormType = (typeof FORM_TYPES)[number];

const isPrayerT = (formData: Root): formData is Prayer => formData.hasOwnProperty("sections");
const isReadingT = (formData: Root): formData is Reading => formData.hasOwnProperty("liturgy-gospel");

interface DataFormProps {
    formData: Root;
    setFormData: Dispatch<SetStateAction<Root>>;
}

export const DataForm = ({ formData, setFormData }: DataFormProps) => {
    const t = useTranslations("DataForm");
    const [formType, setFormType] = useState<FormType>("prayer");
    const [languages, setLanguages] = useLocalStorage<Language[]>("settings:form-languages", ["english", "arabic"]);

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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Language input */}
            <Box>
                <Typography fontWeight="600" variant="h6">
                    {t("language-field-label")}
                </Typography>
                <LanguageFields value={languages} onChange={setLanguages} size={2} />
            </Box>

            {/* Title */}
            <Box>
                <Typography fontWeight="600" variant="h6">
                    {t("title-field-label")}
                </Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(value) => handleChange("title", value)}
                    languages={languages}
                />
            </Box>

            {/* FormType Field */}
            <Box>
                <Typography fontWeight="600" variant="h6">
                    {t("formType-field-label")}
                </Typography>
                <ToggleButtonGroup
                    value={formType}
                    onChange={(_, value) => onFormTypeChange(value)}
                    color="primary"
                    fullWidth
                    exclusive
                >
                    {FORM_TYPES.map((type) => (
                        <ToggleButton disabled={type === formType} key={type} value={type}>
                            {t(`formType-field-option-${type}`)}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            {formType === "prayer" && (
                <PrayerForm formData={formData as Prayer} setFormData={setFormData} languages={languages} />
            )}
            {formType === "reading" && (
                <ReadingForm formData={formData as Reading} setFormData={setFormData} languages={languages} />
            )}
        </Box>
    );
};
