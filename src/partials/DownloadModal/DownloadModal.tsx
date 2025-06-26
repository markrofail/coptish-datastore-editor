import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    styled,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useLocale } from "@/app/providers";
import { TextField } from "@/components/TextField";

const Dialog = styled(MuiDialog)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 16,
        padding: theme.spacing(2),
        width: 400,
        maxWidth: "90vw",
    },
}));

const DialogTypography = styled(Typography)(({ theme }) => ({
    "&.label": {
        fontWeight: 600,
        fontSize: "1rem",
    },
    "&.subtext": {
        fontSize: "0.85rem",
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    },
}));

interface DownloadButtonModalProps {
    initialFileName: string;
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export const DownloadButtonModal = ({ open, onClose, onConfirm, initialFileName }: DownloadButtonModalProps) => {
    const t = useTranslations("DownloadModal");
    const { dir } = useLocale();
    const [fileName, setFileName] = useState(initialFileName);

    useEffect(() => {
        setFileName(initialFileName);
    }, [initialFileName]);

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} dir={dir}>
            <DialogTitle>
                <DialogTypography className="label">{t("title")}</DialogTypography>
            </DialogTitle>

            <DialogContent>
                <DialogTypography className="subtext">{t("subtext")}</DialogTypography>
                <TextField
                    label={t("filenameLabel")}
                    fullWidth
                    autoFocus
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                <Button onClick={onClose} sx={{ borderRadius: 12, textTransform: "none" }}>
                    {t("cancelButton")}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    sx={{ borderRadius: 16, textTransform: "none", padding: "8px 24px", fontWeight: 500 }}
                >
                    {t("confirmButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
