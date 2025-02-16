"use client";

import React, { useState } from "react";
import _ from "lodash";
import { Prayer } from "@/types";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { OccasionForm } from "@/components/OccasionForm";
import { Section, SectionsForm } from "@/components/SectionsForm";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TranslateIcon from "../components/TranslateIcon";
import { useLocale } from "./providers";

export default function Home() {
    const t = useTranslations();
    const { locale, setLocale } = useLocale();

    const [formData, setFormData] = useState<Prayer>({});
    const [fileName, setFileName] = useState("");

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleChange = (path: string, value: any) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, path, value);
            return newData;
        });
    };

    const handleAddSection = () => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newSection: any = { type: "verses" };
        if (newSection.type === "verses") newSection.verses = [{ english: "" }];
        if (newSection.type === "info") newSection.text = { english: "" };
        if (newSection.type === "compound-prayer") newSection.path = "";
        setFormData((prevData) => ({
            ...prevData,
            sections: [...(prevData.sections || []), newSection],
        }));
    };

    const handleSectionsChange = (newSections: Section[]) => {
        setFormData((prevData) => ({ ...prevData, sections: newSections }));
    };

    const handleDeleteSection = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            sections: prevData.sections?.filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        const jsonData = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Use the filename from state
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Update filename state when loading
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const loadedData = JSON.parse(e.target?.result as string);
                    setFormData(loadedData);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Invalid JSON file.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleChangeLocale = () => {
        setLocale(locale === "en" ? "ar" : "en");
    };

    return (
        <>
            <div className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"}>
                <main className={styles.main}>
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <Typography variant="h2" component="div" sx={{ flex: 1 }}>
                            {t("title")}
                        </Typography>

                        <Box>
                            {/* Load Button */}
                            <IconButton color="inherit" onClick={handleSave}>
                                <SaveIcon />
                            </IconButton>

                            {/* SaveButton */}
                            <IconButton color="inherit" onClick={() => document.getElementById("file-upload")?.click()}>
                                <CloudUploadIcon />
                            </IconButton>
                            <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />

                            <IconButton color="inherit" onClick={handleChangeLocale}>
                                <TranslateIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                            />
                        </Box>

                        {/* Occasion */}
                        <Box>
                            <Typography variant="h6">{t("occasion-field-label")}</Typography>
                            <OccasionForm
                                value={formData.occasion}
                                onChange={(newValue) => handleChange("occasion", newValue)}
                            />
                        </Box>

                        {/* Sections */}
                        <Box>
                            <Typography variant="h6">{t("sections-field-label")}</Typography>
                            <SectionsForm
                                sections={formData.sections}
                                onChange={handleSectionsChange}
                                onDelete={handleDeleteSection}
                                onAdd={handleAddSection}
                            />
                        </Box>
                    </Box>
                </main>
            </div>
        </>
    );
}
