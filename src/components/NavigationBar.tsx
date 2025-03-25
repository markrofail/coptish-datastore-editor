import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocale } from "@/app/providers";
import TranslateIcon from "@/components/TranslateIcon";

interface NavigationBarProps {
    onMenuClick: () => void;
}

export const NavigationBar = ({ onMenuClick }: NavigationBarProps) => {
    const theme = useTheme();
    const isSmallViewPort = useMediaQuery(theme.breakpoints.up("md"));
    const { locale, setLocale } = useLocale();

    const handleChangeLocale = () => {
        setLocale(locale === "en" ? "ar" : "en");
    };

    return (
        <AppBar position="static" color="primary" variant="outlined" sx={{ border: 0 }}>
            <Toolbar sx={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                {/* left */}
                <Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* right */}
                <Box>
                    <Box>
                        <Button
                            variant="text"
                            color="inherit"
                            startIcon={<TranslateIcon />}
                            onClick={handleChangeLocale}
                        >
                            {locale === "en" ? "عربي" : "English"}
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
