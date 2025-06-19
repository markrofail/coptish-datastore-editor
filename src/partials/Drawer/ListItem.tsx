import {
    ListItemButton as MuiListItemButton,
    ListItemIcon as MuiListItemIcon,
    ListItemText as MuiListItemText,
    ListItem as MuiListItem,
    styled,
} from "@mui/material";

const ListItemButton = styled(MuiListItemButton, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
    borderRadius: "50px",
    mx: open ? 1 : 0.5,
    my: 0.5,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&.Mui-selected": {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
}));

const ListItemIcon = styled(MuiListItemIcon, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
    color: "#1a73e8", // Gemini brand color for icons
}));

const ListItemText = styled(MuiListItemText, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
    opacity: open ? 1 : 0,
    marginLeft: 6,
    transition: "opacity 0.2s",
}));

const ListItem = MuiListItem;

export { ListItem, ListItemButton, ListItemIcon, ListItemText };
