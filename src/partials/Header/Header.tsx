import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TranslateIcon from "@/components/TranslateIcon";
import { Prayer } from "@/types";
import { useTranslations } from "next-intl";
import { useLocale } from "@/app/providers";
import { ymlToUrl } from "@/utils/yml";

interface HeaderProps {
    formData: Prayer;
    setFormData: Dispatch<SetStateAction<Prayer>>;
    fileName: string;
    setFileName: Dispatch<SetStateAction<string>>;
}

export const Header = ({ formData, fileName }: HeaderProps) => {
    const t = useTranslations();
    const { locale, setLocale } = useLocale();
    const onLocaleToggle = () => setLocale(locale === "en" ? "ar" : "en");

    const handleSave = () => {
        const url = ymlToUrl(formData);

        const link = document.createElement("a");
        link.download = fileName.endsWith(".yml") || fileName.endsWith(".yaml") ? fileName : `${fileName}.yml`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    };

    // const handleLoad = (event: ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     loadYmlFile(file)
    //         .then((result) => {
    //             if (result.name) setFileName(result.name);
    //             if (result.data) setFormData(result.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error loading file:", error);
    //             alert("Error loading file. Please check the console for more details.");
    //         });
    // };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h2" component="div">
                {t("title")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Box>
                    <Button variant="text" color="inherit" startIcon={<TranslateIcon />} onClick={onLocaleToggle}>
                        {t("toggle-language-label")}
                    </Button>
                </Box>

                <Box>
                    <Button variant="text" color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
                        {t("save-button-label")}
                    </Button>
                </Box>

                <Box>
                    <Button
                        variant="text"
                        color="inherit"
                        startIcon={<FileUploadIcon />}
                        onClick={() => document.getElementById("file-upload")?.click()}
                    >
                        {t("upload-button-label")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
