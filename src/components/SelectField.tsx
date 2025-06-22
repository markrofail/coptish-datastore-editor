import { Select as MuiSelect, styled } from "@mui/material";

export const Select = styled(MuiSelect)(({ theme }) => ({
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(60, 60, 67, 0.1)",
    paddingLeft: 12,
    paddingRight: 12,
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.divider,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 6px ${theme.palette.primary.main}33`,
    },
}));
