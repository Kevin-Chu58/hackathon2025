import {
    Grid2 as Grid,
    Button,
    Breadcrumbs,
    Box,
    Avatar,
    Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavButton from "./NavButton";
import { SiSnapdragon } from "react-icons/si";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from "@mui/icons-material/Settings";

const NavBar = () => {
    const logoBrightnessOn = 1.2;
    const logoBrightnessOff = 1;
    const usernameGuest = "";
    const userAvatarGuest = "";

    const { user, isAuthenticated, logout } = useAuth0();
    const [logoBrightness, setLogoBrightness] = useState(logoBrightnessOff);
    const [anchorEleSettings, setAnchorEleSettings] = useState(null);

    useEffect(() => {}, []);

    const handleLogoHover = () => {
        setLogoBrightness(logoBrightnessOn);
    };

    const handleLogoNonHover = () => {
        setLogoBrightness(logoBrightnessOff);
    };

    const handleOpenSettingsMenu = (e) => {
        setAnchorEleSettings(e.currentTarget);
    };

    const handleCloseSettingsMenu = () => {
        setAnchorEleSettings(null);
    };

    let username = isAuthenticated ? user?.name : usernameGuest;
    let avatar = isAuthenticated ? user?.picture : userAvatarGuest;

    return (
        <Grid
            container
            sx={{
                background: "black",
                p: 2,
                pb: 1,
                mb: "-1px",
                borderBottom: `1px ${grey[800]} solid`,
                alignItems: "center",
            }}
        >
            <Grid
                size={6}
                sx={{
                    display: "flex",
                }}
            >
                {/* menu button */}
                <Button
                    disableRipple
                    variant="outlined"
                    sx={{
                        minWidth: 0,
                        m: 0,
                        p: 0.5,
                        mr: 2,
                        boxShadow: "none",
                        color: grey[600],
                        borderColor: grey[700],
                        ":hover": {
                            filter: "brightness(1.2)",
                            background: grey[900],
                        },
                    }}
                >
                    <MenuIcon />
                </Button>
                {/* logo */}
                <Box sx={{ color: grey[300], mx: 1, pt: 0.5 }}>
                    <div
                        onMouseOver={handleLogoHover}
                        onMouseOut={handleLogoNonHover}
                    >
                        <SiSnapdragon
                            id="logo"
                            size={28}
                            style={{
                                cursor: "pointer",
                                filter: `brightness(${logoBrightness})`,
                            }}
                        />
                    </div>
                </Box>
                {/* group name */}
                <Breadcrumbs color={grey[500]}>
                    <NavButton>hackathon2025</NavButton>
                    <NavButton isFocus>embeddededed.ai</NavButton>
                </Breadcrumbs>
            </Grid>

            {isAuthenticated && (
                <Grid
                    size={6}
                    sx={{
                        justifyItems: "right",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    {/* setting button */}
                    <Button
                        disableRipple
                        variant="outlined"
                        sx={{
                            minWidth: 0,
                            ml: "auto",
                            p: 0.5,
                            mr: 2,
                            boxShadow: "none",
                            color: grey[600],
                            borderColor: grey[700],
                            ":hover": {
                                filter: "brightness(1.2)",
                                background: grey[900],
                            },
                        }}
                        onClick={handleOpenSettingsMenu}
                    >
                        <SettingsIcon />
                    </Button>
                    <Menu
                        sx={{
                            mt: 5,
                            color: "black",
                            "& .MuiMenu-paper": {
                                background: "black",
                                border: `1px ${grey[800]} solid`,
                                "& .MuiMenu-list": {
                                    p: 0,
                                }
                            },
                        }}
                        anchorEl={anchorEleSettings}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEleSettings)}
                        onClose={handleCloseSettingsMenu}
                    >
                        {/* logout-button */}
                        <NavButton
                            onClick={logout}
                        >
                            sign out
                        </NavButton>
                    </Menu>

                    <Avatar
                        alt={username}
                        src={avatar}
                        sx={{ width: 42, height: 42 }}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default NavBar;
