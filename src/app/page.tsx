"use client";

import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";
import { DRAWER_WIDTH, ResponsiveDrawer } from "@/partials/Drawer";
import { Root } from "@/types";
import { NavigationBar } from "@/components/NavigationBar";

export default function Home() {
    const { locale } = useLocale();
    const theme = useTheme();
    const isLargeViewPort = useMediaQuery(theme.breakpoints.up("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<Root>({});
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setDrawerOpen(isLargeViewPort);
    }, [isLargeViewPort]);

    const toggleDrawerOpen = () => setDrawerOpen((prev) => !prev);

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
    };

    return (
        <Box sx={{ display: "flex" }} dir={locale === "ar" ? "rtl" : "ltr"}>
            <Box
                component="nav"
                sx={{
                    width: { md: drawerOpen ? DRAWER_WIDTH : 0 },
                    flexShrink: { md: drawerOpen ? 0 : 1 },
                }}
            >
                <ResponsiveDrawer
                    onFileLoad={onFileLoad}
                    directory={directoryTree}
                    open={drawerOpen}
                    onClose={toggleDrawerOpen}
                />
            </Box>
            <Box sx={{ flexGrow: 1, width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" } }}>
                <NavigationBar onMenuClick={toggleDrawerOpen} />
                <Box component="main" sx={{ p: 3 }}>
                    <DataForm
                        formData={formData}
                        setFormData={setFormData}
                        fileName={fileName}
                        setFileName={setFileName}
                    />
                </Box>
            </Box>
        </Box>
    );
}
