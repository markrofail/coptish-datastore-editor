"use client";

import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";
import { DRAWER_WIDTH, ResponsiveDrawer } from "@/partials/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Root } from "@/types";

export default function Home() {
    const { locale } = useLocale();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<Root>({});
    const [fileName, setFileName] = useState("");

    const toggleDrawerOpen = () => setDrawerOpen((prev) => !prev);

    const onFileLoad = (fileName: string, data: Root) => {
        setFileName(fileName);
        setFormData(data);
    };

    return (
        <Box dir={locale === "ar" ? "rtl" : "ltr"}>
            <AppBar position="static" color="transparent" sx={{ border: 0 }} variant="outlined">
                <Toolbar>
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
                </Toolbar>
            </AppBar>
            <Box sx={{ display: "flex" }}>
                <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                    <ResponsiveDrawer
                        onFileLoad={onFileLoad}
                        directory={directoryTree}
                        open={drawerOpen}
                        onClose={toggleDrawerOpen}
                    />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
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
