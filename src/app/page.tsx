"use client";

import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";
import { DRAWER_WIDTH, ResponsiveDrawer } from "@/partials/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Root } from "@/types";

export default function Home() {
    const { locale } = useLocale();
    const theme = useTheme();
    const isSmallViewPort = useMediaQuery(theme.breakpoints.up("md"));

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<Root>({});
    const [fileName, setFileName] = useState("");

    const toggleDrawerOpen = () => setDrawerOpen((prev) => !prev);

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
    };

    return (
        <Box sx={{ display: "flex" }} dir={locale === "ar" ? "rtl" : "ltr"}>
            <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                <ResponsiveDrawer
                    onFileLoad={onFileLoad}
                    directory={directoryTree}
                    open={drawerOpen}
                    onClose={toggleDrawerOpen}
                />
            </Box>
            <Box sx={{ flexGrow: 1, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
                <AppBar position="static" color="transparent" variant="outlined" sx={{ border: 0 }}>
                    <Toolbar>
                        {!isSmallViewPort && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>
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
