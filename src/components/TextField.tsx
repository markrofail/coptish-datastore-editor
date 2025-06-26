import { TextField as MuiTextField, styled } from "@mui/material";

export const TextField = styled(MuiTextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
        borderRadius: 12, // rounded corners
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(60, 60, 67, 0.1)", // subtle iOS-style shadow
        paddingLeft: 12,
        paddingRight: 12,
        // Smooth transition for focus
        transition: theme.transitions.create(["box-shadow", "border-color"], {
            duration: theme.transitions.duration.short,
        }),
    },
    "& label": {
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.light,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 8px ${theme.palette.primary.main}44`,
        },
    },
}));
