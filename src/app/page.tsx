"use client";

import React, { useState } from "react";
import { Prayer } from "@/types";
import { Box } from "@mui/material";
import { FileExplorer } from "@/partials/FileExplorer";
import directoryTree from "@/directory_tree.json";
import { DataForm } from "@/partials/DataForm";
import { useLocale } from "./providers";

export default function Home() {
    const { locale } = useLocale();
    const [formData, setFormData] = useState<Prayer>({});
    const [fileName, setFileName] = useState("");

    const onFileLoad = (fileName: string, data: Prayer) => {
        setFileName(fileName); // Update filename state when loading
        setFormData(data);
    };

    return (
        <div dir={locale === "ar" ? "rtl" : "ltr"}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <Box flex={1} paddingTop={24} paddingLeft={2}>
                    <FileExplorer directory={directoryTree} onFileLoad={onFileLoad} />
                </Box>

                <Box flex={10} paddingTop={8}>
                    <DataForm
                        formData={formData}
                        setFormData={setFormData}
                        fileName={fileName}
                        setFileName={setFileName}
                    />
                </Box>

                <Box flex={1} />
            </Box>
        </div>
    );
}
