import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFound = () => {
    const navigateTo = useNavigate();

    return (
        <Container sx={{ justifyItems: "center", pt: 10 }}>
            <Typography
                variant="h3"
                sx={{
                    fontFamily: "Emblema One",
                    textShadow: "2px 2px 2px cyan",
                }}
            >
                404 Not Found
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Emblema One", m: 2 }}>
                Go back to{" "}
                <span
                    className="notFound-home-link"
                    onClick={() => navigateTo("/home")}
                >
                    Home
                </span>
            </Typography>
        </Container>
    );
};

export default NotFound;
