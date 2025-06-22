"use client";

import React, { CSSProperties, useState } from "react";
import { Box, styled } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { Root } from "@/types";
import { parse } from "yaml";
import { DownloadButtonModal } from "@/partials/DownloadModal/DownloadModal";
import { Header } from "@/partials/Header";
import { FileExplorer } from "@/partials/Drawer/FileExplorer";

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: 1024,
    marginLeft: "auto",
    marginRight: "auto",
    // Ensure content is pushed below the AppBar
    paddingTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(3)})`,
    [theme.breakpoints.up("sm")]: {
        paddingTop: `calc(${(theme.mixins.toolbar["@media (min-width:600px)"] as CSSProperties).minHeight}px + ${theme.spacing(3)})`,
    },
}));

export default function Home() {
    const [formData, setFormData] = useState<Root>({});
    const [fileName, setFileName] = useState("");
    const [downloadModalOpen, setDownloadModalOpen] = useState(false);
    const toggleDownloadModal = () => setDownloadModalOpen((prev) => !prev);

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
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
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />
            <Main>
                <Header formData={formData} setFormData={setFormData} fileName={fileName} setFileName={setFileName} />
                <FileExplorer onFileLoad={onFileLoad} directory={directoryTree} />
                <DataForm formData={formData} setFormData={setFormData} />
            </Main>

            <DownloadButtonModal
                open={downloadModalOpen}
                onClose={toggleDownloadModal}
                formData={formData}
                initialFileName={fileName}
            />
        </Box>
    );
}
