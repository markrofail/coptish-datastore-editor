"use client";

import React, { CSSProperties, useState } from "react";
import { Box, styled } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, ResponsiveDrawer } from "@/partials/Drawer";
import { Root } from "@/types";
import { NavigationBar } from "@/components/NavigationBar";
import { ymlToUrl } from "@/utils/yml";
import { DrawerContextProvider, useDrawerState } from "@/hooks/useDrawerState";

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

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
    };

    const handleSave = () => {
        const url = ymlToUrl(formData);

        const link = document.createElement("a");
        link.download = fileName.endsWith(".yml") || fileName.endsWith(".yaml") ? fileName : `${fileName}.yml`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <DrawerContextProvider value={drawerState}>
            <Box sx={{ display: "flex" }} dir={locale === "ar" ? "rtl" : "ltr"}>
                <NavigationBar />

                <ResponsiveDrawer onFileLoad={onFileLoad} directory={directoryTree} onSaveButtonClick={handleSave} />

                <Main open={drawerState.open}>
                    <DataForm
                        formData={formData}
                        setFormData={setFormData}
                        fileName={fileName}
                        setFileName={setFileName}
                    />
                </Main>
            </Box>
        </DrawerContextProvider>
    );
}
