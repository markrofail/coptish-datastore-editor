"use client";

import React, { useState } from "react";
import _ from "lodash";
import { Prayer } from "../../types";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { OccasionForm } from "@/components/OccasionForm";
import { Section, SectionsForm } from "@/components/SectionsForm";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TranslateIcon from "@mui/icons-material/Translate";

export default function Home() {
    const t = useTranslations();
    const router = useRouter();
    const { locale } = useParams();

    const [formData, setFormData] = useState<Prayer>({});
    const [fileName, setFileName] = useState("prayer_data.json"); // State for filename

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleChange = (path: string, value: any) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, path, value);
            return newData;
        });
    };

    const handleAddSection = (type: string) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newSection: any = { type };
        if (type === "verses") newSection.verses = [{ english: "" }];
        if (type === "info") newSection.text = { english: "" };
        if (type === "compound-prayer") newSection.path = "";
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
        const newLocale = locale === "en" ? "ar" : "en";
        router.replace(`/${newLocale}`);
    };

    return (
        <>
            <div className={styles.page}>
                <main className={styles.main}>
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <Typography variant="h2" component="div" sx={{ flex: 1 }}>
                            Data Input Form
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
                            label="File Name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            fullWidth
                            margin="normal" // Add some margin
                        />

                        {/* Title */}
                        <>
                            <Typography variant="h6">{t("title-field-label")}</Typography>
                            <MultiLingualTextForm
                                value={formData.title || { english: "" }}
                                onChange={(newValue) => handleChange("title", newValue)}
                            />
                        </>

                        {/* Occasion */}
                        <>
                            <Typography variant="h6">Occasion</Typography>
                            <OccasionForm
                                value={formData.occasion}
                                onChange={(newValue) => handleChange("occasion", newValue)}
                            />
                        </>

                        {/* Sections */}
                        <>
                            <Typography variant="h6">Sections</Typography>
                            <SectionsForm
                                sections={formData.sections}
                                onChange={handleSectionsChange}
                                onDelete={handleDeleteSection}
                            />
                        </>

                        <Button variant="contained" onClick={() => handleAddSection("verses")}>
                            Add Section
                        </Button>
                    </Box>
                </main>
            </div>
        </>
    );
}
