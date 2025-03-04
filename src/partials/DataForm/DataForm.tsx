import React, { useEffect, useState } from "react";
import _ from "lodash";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { Box, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Prayer, Reading, Root } from "@/types";
import { useTranslations } from "next-intl";
import { Header } from "../Header";
import { PrayerForm } from "./PrayerForm";
import { ReadingForm } from "./ReadingForm";

const isPrayerT = (formData: Root): formData is Prayer => (formData as Prayer).sections !== undefined;
const isReadingT = (formData: Root): formData is Reading => (formData as Reading).text !== undefined;

interface DataFormProps {
    formData: Root;
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export const DataForm = ({ formData, setFormData, fileName, setFileName }: DataFormProps) => {
    const t = useTranslations("DataForm");
    const [formType, setFormType] = useState<"prayer" | "reading" | "synaxarium">("prayer");

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

    const onFormTypeChange = (value: "prayer" | "reading" | "synaxarium") => {
        setFormType(value);

        const commonProps = { title: formData.title };

        switch (value) {
            case "prayer":
                setFormData({ ...commonProps, sections: [] });
                break;
            case "reading":
                setFormData({ ...commonProps, text: {} });
                break;
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Header formData={formData} setFormData={setFormData} fileName={fileName} setFileName={setFileName} />

            {/* Filename input */}
            <TextField
                label={t("fileName-field-label")}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                fullWidth
            />

            {/* Title */}
            <Box>
                <Typography variant="h6">{t("title-field-label")}</Typography>
                <MultiLingualTextForm
                    value={formData.title || { english: "" }}
                    onChange={(newValue) => handleChange("title", newValue)}
                    languages={["english", "arabic", "coptic"]}
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

            {formType === "prayer" && <PrayerForm formData={formData as Prayer} setFormData={setFormData} />}
            {formType === "reading" && <ReadingForm formData={formData as Reading} setFormData={setFormData} />}
        </Box>
    );
};
