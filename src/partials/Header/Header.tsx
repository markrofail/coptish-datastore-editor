import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Prayer } from "@/types";
import { useTranslations } from "next-intl";
import { ymlToUrl } from "@/utils/yml";

interface HeaderProps {
    formData: Prayer;
    setFormData: Dispatch<SetStateAction<Prayer>>;
    fileName: string;
    setFileName: Dispatch<SetStateAction<string>>;
}

export const Header = ({ formData, fileName }: HeaderProps) => {
    const t = useTranslations();

    const handleSave = () => {
        const url = ymlToUrl(formData);

        const link = document.createElement("a");
        link.download = fileName.endsWith(".yml") || fileName.endsWith(".yaml") ? fileName : `${fileName}.yml`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    };

    // const handleLoad = (event: ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     loadYmlFile(file)
    //         .then((result) => {
    //             if (result.name) setFileName(result.name);
    //             if (result.data) setFormData(result.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error loading file:", error);
    //             alert("Error loading file. Please check the console for more details.");
    //         });
    // };

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 6 }}>
            <Typography variant="h2" component="div">
                {t("title")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Box>
                    <Button variant="text" color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
                        {t("save-button-label")}
                    </Button>
                </Box>

                {/* <Box>
                    <Button
                        variant="text"
                        color="inherit"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => document.getElementById("file-upload")?.click()}
                    >
                        {t("upload-button-label")}
                    </Button>
                    <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleLoad} />
                </Box> */}
            </Box>
        </Box>
    );
};
