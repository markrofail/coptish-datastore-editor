import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import _ from "lodash";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import {
    Box,
    Typography as MuiTypography,
    ToggleButton as MuiToggleButton,
    ToggleButtonGroup as MuiToggleButtonGroup,
    styled,
} from "@mui/material";
import { Prayer, Reading, Root } from "@/types";
import { useTranslations } from "next-intl";
import { PrayerForm } from "../PrayerForm";
import { ReadingForm } from "./ReadingForm";
import { Language, LanguageFields } from "./LanguageFields";

const FORM_TYPES = ["prayer", "reading", "synaxarium"] as const;
type FormType = (typeof FORM_TYPES)[number];

const isPrayerT = (formData: Root): formData is Prayer => formData.hasOwnProperty("sections");
const isReadingT = (formData: Root): formData is Reading => formData.hasOwnProperty("liturgy-gospel");

const Typography = styled(MuiTypography)(() => ({
    fontWeight: 600,
    marginBottom: 8,
}));

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
}));

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    flex: 1,
    fontWeight: 500,
    padding: "10px 16px",
    color: theme.palette.text.primary,
    border: "none",
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 0 6px ${theme.palette.primary.main}33`,
    },
    "&:not(:last-of-type)": {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

interface DataFormProps {
    formData: Root;
    setFormData: Dispatch<SetStateAction<Root>>;
}

export const DataForm = ({ formData, setFormData }: DataFormProps) => {
    const t = useTranslations("DataForm");
    const [formType, setFormType] = useState<FormType>("prayer");
    const [languages, setLanguages] = useState<Language[]>(["english", "arabic"]);

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
                <Typography variant="h6">{t("language-field-label")}</Typography>
                <LanguageFields value={languages} onChange={setLanguages} size={2} />
            </Box>

            {/* Title */}
            <Box>
                <Typography variant="h6">{t("title-field-label")}</Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(value) => handleChange("title", value)}
                    languages={languages}
                />
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
                <PrayerForm formData={formData as Prayer} setFormData={setFormData} languages={languages} />
            )}
            {formType === "reading" && (
                <ReadingForm formData={formData as Reading} setFormData={setFormData} languages={languages} />
            )}
        </Box>
    );
};
