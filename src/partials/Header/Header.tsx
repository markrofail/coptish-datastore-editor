import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TranslateIcon from "@/components/TranslateIcon";
import { Prayer } from "@/types";
import { useLocale } from "../../app/providers";
import { useTranslations } from "next-intl";

interface HeaderProps {
    formData: Prayer;
    setFormData: React.Dispatch<React.SetStateAction<Prayer>>;
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({ formData, setFormData, fileName, setFileName }: HeaderProps) => {
    const t = useTranslations();
    const { locale, setLocale } = useLocale();

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
            const reader = new FileReader();
            setFileName(file.name);
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, marginBottom: 6 }}>
            <Typography variant="h2" component="div">
                {t("title")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Box>
                    <Button variant="text" color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
                        {t("save-button-label")}
                    </Button>
                </Box>

                <Box>
                    <Button
                        variant="text"
                        color="inherit"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => document.getElementById("file-upload")?.click()}
                    >
                        {t("upload-button-label")}
                    </Button>
                    <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />
                </Box>

                <Box>
                    <Button variant="text" color="inherit" startIcon={<TranslateIcon />} onClick={handleChangeLocale}>
                        {locale === "en" ? "عربي" : "English"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
