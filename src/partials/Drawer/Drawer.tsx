import * as React from "react";
import { Drawer, useTheme, useMediaQuery, Box } from "@mui/material";
import { FileExplorer, FileExplorerProps } from "./FileExplorer";

export const DRAWER_WIDTH = 360;

interface ResponsiveDrawerProps extends FileExplorerProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

export const ResponsiveDrawer = ({ open, onClose, ...fileExplorerProps }: ResponsiveDrawerProps) => {
    const theme = useTheme();
    const isLargeViewPort = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Drawer
            variant={isLargeViewPort && open ? "permanent" : "temporary"}
            open={open}
            onClose={onClose}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH, border: 0 } }}
        >
            <Box sx={{ p: 2, paddingTop: 8 }}>
                <FileExplorer {...fileExplorerProps} />
            </Box>
        </Drawer>
    );
};
