import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TranslateIcon from "@/components/TranslateIcon";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useTranslations } from "next-intl";

interface HeaderProps {
    onSaveClick: () => void;
    onUploadClick: () => void;
    onLocaleToggle: () => void;
    onPdfExportClick: () => void;
}

export const Header = ({ onSaveClick, onUploadClick, onLocaleToggle, onPdfExportClick }: HeaderProps) => {
    const t = useTranslations();

    const buttons = [
        { icon: <TranslateIcon />, onClick: onLocaleToggle, label: t("toggle-language-label") },
        { icon: <SaveIcon />, onClick: onSaveClick, label: t("save-button-label") },
        { icon: <FileUploadIcon />, onClick: onUploadClick, label: t("upload-button-label") },
        { icon: <PictureAsPdfIcon />, onClick: onPdfExportClick, label: t("pdf-button-label") },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h2" component="div">
                {t("title")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                {buttons.map(({ icon, label, onClick }, index) => (
                    <Box key={index}>
                        <Button variant="text" color="inherit" startIcon={icon} onClick={onClick}>
                            {label}
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
