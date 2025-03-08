import { Grid2 as Grid, Button, Breadcrumbs, Icon, Box, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavButton from "./NavButton";
import { SiSnapdragon } from "react-icons/si";
import { grey } from "@mui/material/colors";
import NavTab from "./NavTab";
import { useEffect, useState } from "react";

const NavBar = () => {
    const logoBrightnessOn = 1.2;
    const logoBrightnessOff = 1;

    const [logoBrightness, setLogoBrightness] = useState(logoBrightnessOff);

    useEffect(() => {}, []);

    const handleLogoHover = () => {
        setLogoBrightness(logoBrightnessOn);
    }

    const handleLogoNonHover = () => {
        setLogoBrightness(logoBrightnessOff);
    }

    return (
        <Grid
            container
            sx={{
                background: "black",
                p: 2,
                pb: 0,
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
                <Box sx={{color: grey[300], mx: 1, pt: .5}}>
                    <div onMouseOver={handleLogoHover} onMouseOut={handleLogoNonHover}>
                        <SiSnapdragon id="logo" size={28} style={{
                            cursor: "pointer",
                            filter: `brightness(${logoBrightness})`,
                        }} />
                    </div>
                </Box>
                {/* group name */}
                <Breadcrumbs color={grey[500]}>
                    <NavButton>
                        hackathon2025
                    </NavButton>
                    <NavButton isFocus>
                        embeddededed.ai
                    </NavButton>
                </Breadcrumbs>
            </Grid>
            
            {/* tab bar */}
            <Grid size={12} p={0}>
                <Stack 
                    direction="row"
                    spacing={1}
                    sx={{
                        m: 1,
                        mb: 0,
                        width: "fit-content",
                }}>
                    <NavTab isFocus={true}>
                        Tab 1
                    </NavTab>
                    <NavTab isFocus={false}>
                        Tab 2
                    </NavTab>
                    <NavTab isFocus={false}>
                        Tab 3
                    </NavTab>
                    <NavTab isFocus={false}>
                        Tab 4
                    </NavTab>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default NavBar;
