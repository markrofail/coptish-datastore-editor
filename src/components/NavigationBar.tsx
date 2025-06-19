import { AppBar as MuiAppBar, IconButton, Toolbar, styled, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "@/partials/Drawer";
import { useDrawerContext } from "@/hooks/useDrawerState";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: "white",
    boxShadow: "none",
}));

export const NavigationBar = () => {
    const { setOpen } = useDrawerContext();
    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleOpen}
                    edge="start"
                    sx={{ marginRight: 5, color: "text.primary" }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ color: "text.primary" }}>
                    Coptish
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
