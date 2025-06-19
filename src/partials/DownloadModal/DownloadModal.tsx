import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { ymlToUrl } from "@/utils/yml";
import { Root } from "@/types";

// Styled components
const DownloadButton = styled(Button)(() => ({
    borderRadius: 16,
    textTransform: "none",
    padding: "8px 24px",
    fontWeight: 500,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 24,
        padding: theme.spacing(2),
        width: 400,
        maxWidth: "90vw",
    },
}));

const StyledTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
    },
}));

const DialogLabel = styled(Typography)(() => ({
    fontWeight: 600,
    fontSize: "1rem",
}));

const DialogSubText = styled(Typography)(({ theme }) => ({
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

interface DownloadButtonModalProps {
    formData: Root;
    initialFileName: string;
    open: boolean;
    onClose: () => void;
}

export const DownloadButtonModal = ({ open, onClose, formData, initialFileName }: DownloadButtonModalProps) => {
    const [fileName, setFileName] = useState(initialFileName);

    useEffect(() => {
        setFileName(initialFileName);
    }, [initialFileName]);

    const handleSave = () => {
        const url = ymlToUrl(formData);
        const finalFileName = fileName.endsWith(".yml") || fileName.endsWith(".yaml") ? fileName : `${fileName}.yml`;

        const link = document.createElement("a");
        link.download = finalFileName;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        onClose();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <DialogTitle>
                <DialogLabel>Save your file</DialogLabel>
            </DialogTitle>

            <DialogContent>
                <DialogSubText>Choose a name for your file</DialogSubText>
                <StyledTextField
                    label="Filename"
                    fullWidth
                    autoFocus
                    variant="outlined"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                <Button onClick={onClose} sx={{ borderRadius: 12, textTransform: "none" }}>
                    Cancel
                </Button>
                <DownloadButton variant="contained" onClick={handleSave}>
                    Download
                </DownloadButton>
            </DialogActions>
        </StyledDialog>
    );
};
