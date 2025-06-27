import React from "react";
import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TranslateIcon from "@/components/TranslateIcon";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslations } from "next-intl";
import { ExpandableButton } from "@/components/ExpandableButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface ToolbarProps {
    onSaveClick: () => void;
    onUploadClick: () => void;
    onLocaleToggle: () => void;
    onPdfExportClick: () => void;
    onFileExplorerClick: () => void;
    onClearClick?: () => void;
}

export const Toolbar = ({
    onSaveClick,
    onUploadClick,
    onLocaleToggle,
    onPdfExportClick,
    onClearClick,
    onFileExplorerClick,
}: ToolbarProps) => {
    const t = useTranslations();

    const commonProps = {
        variant: "text" as const,
        color: "inherit" as const,
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button {...commonProps} startIcon={<TranslateIcon />} onClick={onLocaleToggle}>
                {t("toggle-language-label")}
            </Button>
            <ExpandableButton
                {...commonProps}
                startIcon={<SaveIcon />}
                options={[
                    { label: t("save-button-label"), icon: <InsertDriveFileIcon />, onClick: onSaveClick },
                    { label: t("pdf-button-label"), icon: <PictureAsPdfIcon />, onClick: onPdfExportClick },
                ]}
            >
                {t("save-button-label")}
            </ExpandableButton>
            <ExpandableButton
                {...commonProps}
                startIcon={<FileUploadIcon />}
                options={[
                    {
                        label: t("FileExplorer.heading-database"),
                        icon: <FolderSharedIcon />,
                        onClick: onFileExplorerClick,
                    },
                    { label: t("upload-button-label"), icon: <UploadFileIcon />, onClick: onUploadClick },
                ]}
            >
                {t("upload-button-label")}
            </ExpandableButton>
            {onClearClick && (
                <Button {...commonProps} startIcon={<ClearIcon />} onClick={onClearClick}>
                    {t("clear-button-label")}
                </Button>
            )}
        </Box>
    );
};
