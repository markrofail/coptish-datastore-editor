"use client";

import React, { CSSProperties, useState } from "react";
import { Box, styled } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, ResponsiveDrawer } from "@/partials/Drawer";
import { Root } from "@/types";
import { NavigationBar } from "@/components/NavigationBar";
import { DrawerContextProvider, useDrawerState } from "@/hooks/useDrawerState";
import { parse } from "yaml";
import { DownloadButtonModal } from "@/partials/DownloadModal/DownloadModal";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{ open: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // Initial margin when drawer is closed (respect collapsed width)
    marginLeft: DRAWER_WIDTH_COLLAPSED,
    // Initial width when drawer is closed (respect collapsed width)
    width: `calc(100% - ${DRAWER_WIDTH_COLLAPSED}px)`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // Shift margin when drawer is open
        marginLeft: DRAWER_WIDTH,
        // Adjust width when drawer is open
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
    }),
    // Ensure content is pushed below the AppBar
    paddingTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(3)})`,
    [theme.breakpoints.up("sm")]: {
        paddingTop: `calc(${(theme.mixins.toolbar["@media (min-width:600px)"] as CSSProperties).minHeight}px + ${theme.spacing(3)})`,
    },
}));

export default function Home() {
    const drawerState = useDrawerState();
    const { locale } = useLocale();
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
        <DrawerContextProvider value={drawerState}>
            <Box sx={{ display: "flex" }} dir={locale === "ar" ? "rtl" : "ltr"}>
                <NavigationBar />

                <ResponsiveDrawer
                    onFileLoad={onFileLoad}
                    directory={directoryTree}
                    onSaveButtonClick={toggleDownloadModal}
                    onUploadButtonClick={() => document.getElementById("file-upload")?.click()}
                />
                <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />

                <Main open={drawerState.open}>
                    <DataForm formData={formData} setFormData={setFormData} />
                </Main>

                <DownloadButtonModal
                    open={downloadModalOpen}
                    onClose={toggleDownloadModal}
                    formData={formData}
                    initialFileName={fileName}
                />
            </Box>
        </DrawerContextProvider>
    );
}
