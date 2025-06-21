import {
    AppBar as MuiAppBar,
    IconButton as MuiIconButton,
    Toolbar as MuiToolbar,
    styled,
    Typography as MuiTypography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "@/partials/Drawer";
import { useDrawerContext } from "@/hooks/useDrawerState";
import { useTranslations } from "next-intl";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
    backdropFilter: "blur(10px)", // subtle iOS blur effect
    backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
    boxShadow: "0 0 10px rgba(60, 60, 67, 0.1)", // soft shadow
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    transition: theme.transitions.create(["width", "margin", "background-color"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin", "background-color"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Toolbar = styled(MuiToolbar)({
    minHeight: 56, // iOS nav bar height on phones
    paddingLeft: 16,
    paddingRight: 16,
});

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    marginRight: 24,
    color: theme.palette.text.primary,
    borderRadius: 8, // rounded corners for comfortable tap target
    padding: 10,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    userSelect: "none",
}));

export const NavigationBar = () => {
    const t = useTranslations();
    const { setOpen } = useDrawerContext();
    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <AppBar position="fixed" elevation={0}>
            <Toolbar>
                <IconButton aria-label="open drawer" onClick={toggleOpen} edge="start">
                    <MenuIcon fontSize="medium" />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {t("title")}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
