import { Container, Typography, Paper, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PiCookingPotFill } from "react-icons/pi";
import "../../asset/css/emblemaOne.css";
import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Container
            sx={{
                mt: 4,
                height: "100%",
                justifyItems: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    background: "black",
                    color: "white",
                    justifyItems: "center",
                }}
            >
                <Box pt={4}>
                    <PiCookingPotFill
                        id="logo"
                        size={80}
                        color="black"
                        style={{
                            border: "1px transparent solid",
                            borderRadius: 100,
                            background: grey[300],
                            padding: 12,
                            boxShadow: "2px 2px 2px cyan",
                        }}
                    />
                </Box>
                <Box
                    py={4}
                    px={8}
                    sx={{ justifyItems: "center", fontFamily: "Emblema One" }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "inherit",
                            textShadow: "2px 2px 2px cyan",
                        }}
                    >
                        AI CHIEF
                    </Typography>
                    <Typography sx={{ fontFamily: "inherit" }}>by</Typography>
                    <Typography sx={{ fontFamily: "inherit" }}>
                        embeddededed.ai
                    </Typography>

                    {/* login-button */}
                    <Typography
                        className="login-button"
                        variant="h4"
                        mt={4}
                        sx={{
                            fontFamily: "Emblema One",
                        }}
                        onClick={loginWithRedirect}
                    >
                        login
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
