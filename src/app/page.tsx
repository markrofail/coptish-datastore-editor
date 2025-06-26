"use client";

import React from "react";
import { Box, styled, Typography } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { Root } from "@/types";
import { parse } from "yaml";
import { DownloadButtonModal } from "@/partials/DownloadModal/DownloadModal";
import { Toolbar } from "@/partials/Toolbar";
import { FileExplorerModal } from "@/partials/FileExplorerModal/FileExplorerModal";
import { ymlToUrl } from "@/utils/yml";
import { exportToPdf } from "@/pdf";
import { useLocale } from "./providers";
import { useLocalStorage, useToggle } from "usehooks-ts";
import { useTranslations } from "next-intl";

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: 1024,
    marginLeft: "auto",
    marginRight: "auto",
}));

export default function Home() {
    const t = useTranslations();
    const { locale, setLocale } = useLocale();
    const onLocaleToggle = () => setLocale(locale === "en" ? "ar" : "en");
    const [formData, setFormData] = useLocalStorage<Root>("form:data", {});
    const [fileName, setFileName] = useLocalStorage("form:file-name", "");
    const [downloadModalOpen, toggleDownloadModal] = useToggle(false);
    const [pdfExportModalOpen, togglePdfExportModal] = useToggle(false);
    const [fileExplorerOpen, toggleFileExplorerOpen] = useToggle(false);

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
    };

    const handleSave = () => {
        const url = ymlToUrl(formData);
        const finalFileName = fileName.endsWith(".yml") || fileName.endsWith(".yaml") ? fileName : `${fileName}.yml`;

        const link = document.createElement("a");
        link.download = finalFileName;
        link.href = url;
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
                    const text = e.target?.result as string;
                    setFormData(parse(text) as Root);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Invalid JSON file.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handlePdfExport = async () => {
        await exportToPdf(formData, `${fileName}.pdf`);
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.click();
    };

    const handleClearClick =
        Object.keys(formData).length > 0
            ? () => {
                  setFormData({});
                  setFileName("");
              }
            : undefined;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />
            <Main>
                <Typography variant="h2" component="div">
                    {t("title")}
                </Typography>
                <Toolbar
                    onSaveClick={toggleDownloadModal}
                    onUploadClick={handleUploadClick}
                    onLocaleToggle={onLocaleToggle}
                    onPdfExportClick={togglePdfExportModal}
                    onFileExplorerClick={toggleFileExplorerOpen}
                    onClearClick={handleClearClick}
                />
                <FileExplorerModal
                    onFileLoad={onFileLoad}
                    directory={directoryTree}
                    open={fileExplorerOpen}
                    onClose={toggleFileExplorerOpen}
                />
                <DataForm formData={formData} setFormData={setFormData} />
            </Main>

            <DownloadButtonModal
                initialFileName={fileName}
                open={downloadModalOpen}
                onClose={toggleDownloadModal}
                onConfirm={handleSave}
            />

            <DownloadButtonModal
                initialFileName={fileName}
                open={pdfExportModalOpen}
                onClose={togglePdfExportModal}
                onConfirm={handlePdfExport}
            />
        </Box>
    );
}
