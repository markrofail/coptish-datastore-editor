import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, styled } from "@mui/material";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
}));

export const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    flex: 1,
    fontWeight: 500,
    padding: "10px 16px",
    color: theme.palette.text.primary,
    border: "none",
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 0 6px ${theme.palette.primary.main}33`,
    },
    "&:not(:last-of-type)": {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));
