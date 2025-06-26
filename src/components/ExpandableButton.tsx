import React, { useLayoutEffect, useRef, useState } from "react";
import { Button as MuiButton, Menu, ButtonProps, styled, MenuList } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocale } from "@/app/providers";

const Button = styled(MuiButton)(({ theme }) => ({
    textTransform: "none",
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightRegular,
}));

const MenuButton = styled(Button)(() => ({
    width: "100%",
    textTransform: "none",
}));

interface ExpandableButtonProps extends Omit<ButtonProps, "onClick"> {
    children: React.ReactNode;
    startIcon?: React.ReactNode;
    options: { label: string; icon?: React.ReactNode; onClick: () => void }[];
}

export const ExpandableButton = ({ children, startIcon, options, ...buttonProps }: ExpandableButtonProps) => {
    const { dir } = useLocale();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useLayoutEffect(() => {
        if (buttonRef.current) setMenuWidth(buttonRef.current.offsetWidth);
    }, [anchorEl]);

    return (
        <>
            <Button
                ref={buttonRef}
                {...buttonProps}
                onClick={handleButtonClick}
                onKeyDown={handleKeyDown}
                startIcon={startIcon}
                endIcon={<KeyboardArrowDownIcon />}
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
            >
                {children}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{ style: { width: menuWidth } }}
                dir={dir}
                aria-label="options menu"
            >
                <MenuList disablePadding>
                    {options.map(({ label, icon, onClick }) => (
                        <MenuButton
                            {...buttonProps}
                            key={label}
                            onClick={() => {
                                onClick();
                                handleClose();
                            }}
                            startIcon={icon}
                        >
                            {label}
                        </MenuButton>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
};
