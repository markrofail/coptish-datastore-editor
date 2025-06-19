import React from "react";
import { Drawer as MuiDrawer, Box, IconButton, List, Theme, styled } from "@mui/material";
import { FileExplorer, FileExplorerProps } from "./FileExplorer";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "./ListItem";
import { useLocale } from "@/app/providers";
import { useTranslations } from "next-intl";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TranslateIcon from "@/components/TranslateIcon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useDrawerContext } from "@/hooks/useDrawerState";

export const DRAWER_WIDTH = 360;
export const DRAWER_WIDTH_COLLAPSED = 70;

// Mixin for opened drawer styles
const openedMixin = (theme: Theme) => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

// Mixin for closed drawer styles
const closedMixin = (theme: Theme) => ({
    width: DRAWER_WIDTH_COLLAPSED,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    [theme.breakpoints.up("sm")]: {
        width: DRAWER_WIDTH_COLLAPSED,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
        border: 0,
        ...(open && { ...openedMixin(theme) }),
        ...(!open && { ...closedMixin(theme) }),
        display: "flex",
        flexDirection: "column",
    },
}));

interface ResponsiveDrawerProps extends FileExplorerProps {
    onSaveButtonClick: () => void;
    onUploadButtonClick: () => void;
}

export const ResponsiveDrawer = ({
    onSaveButtonClick,
    onUploadButtonClick,
    ...fileExplorerProps
}: ResponsiveDrawerProps) => {
    const { locale, setLocale } = useLocale();
    const onLocaleToggle = () => setLocale(locale === "en" ? "ar" : "en");
    const t = useTranslations();

    const { open, setOpen, permanentOpen, setPermanentOpen } = useDrawerContext();

    const handleDrawerToggle = () => {
        setPermanentOpen((prev) => !prev); // Toggle explicit open state
        setOpen((prev) => !prev); // Visual state follows explicit state
    };

    // Handle mouse enter for hover-to-expand
    const handleDrawerMouseEnter = () => {
        // Only expand on hover if not permanently open
        if (!permanentOpen) setOpen(true);
    };

    // Handle mouse leave for hover-to-collapse
    const handleDrawerMouseLeave = () => {
        // Only collapse on leave if not permanently open
        if (!permanentOpen) setOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            open={open}
            onMouseEnter={handleDrawerMouseEnter}
            onMouseLeave={handleDrawerMouseLeave}
        >
            {/* Drawer Header */}
            <Box
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "space-between" : "center",
                    paddingRight: open ? 1 : 0,
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                })}
            >
                {/* Icon to expand/collapse the drawer */}
                <IconButton onClick={handleDrawerToggle}>{open ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
            </Box>
            {/* Top navigation items list */}
            <List>
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton open={open} onClick={onLocaleToggle}>
                        <ListItemIcon open={open}>
                            <TranslateIcon />
                        </ListItemIcon>
                        <ListItemText open={open} primary={locale === "en" ? "عربي" : "English"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton open={open} onClick={onSaveButtonClick}>
                        <ListItemIcon open={open}>
                            <FileDownloadIcon />
                        </ListItemIcon>
                        <ListItemText open={open} primary={t("save-button-label")} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton open={open} onClick={onUploadButtonClick}>
                        <ListItemIcon open={open}>
                            <FileUploadIcon />
                        </ListItemIcon>
                        <ListItemText open={open} primary={t("upload-button-label")} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton open={open}>
                        <ListItemIcon open={open}>
                            <FolderOpenIcon />
                        </ListItemIcon>
                        <ListItemText open={open} primary={t("FileExplorer.heading-database")} />
                    </ListItemButton>
                    {open && <FileExplorer {...fileExplorerProps} />}
                </ListItem>
            </List>
        </Drawer>
    );
};
