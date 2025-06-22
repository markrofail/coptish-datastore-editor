import React, { useState } from "react";
import { Box, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { FileExplorer, FileExplorerProps } from "../Drawer/FileExplorer";
import { useTranslations } from "next-intl";

export const CollapsibleFileExplorer = (props: FileExplorerProps) => {
    const [expanded, setExpanded] = useState(false);
    const t = useTranslations();

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{ marginBottom: 2, width: "100%" }}>
            <Button
                variant="outlined"
                onClick={toggleExpanded}
                startIcon={<FolderOpenIcon />}
                endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ width: "100%", justifyContent: "flex-start" }}
            >
                {t("FileExplorer.heading-database")}
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ padding: 2, border: "1px solid", borderColor: "divider", borderRadius: 1, marginTop: 1 }}>
                    <FileExplorer {...props} />
                </Box>
            </Collapse>
        </Box>
    );
};
