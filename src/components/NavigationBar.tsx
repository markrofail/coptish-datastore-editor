import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocale } from "@/app/providers";
import TranslateIcon from "@/components/TranslateIcon";

interface NavigationBarProps {
    onMenuClick: () => void;
}

export const NavigationBar = ({ onMenuClick }: NavigationBarProps) => {
    const { locale, setLocale } = useLocale();
    const onLocaleToggle = () => setLocale(locale === "en" ? "ar" : "en");

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
                        <Button variant="text" color="inherit" startIcon={<TranslateIcon />} onClick={onLocaleToggle}>
                            {locale === "en" ? "عربي" : "English"}
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
