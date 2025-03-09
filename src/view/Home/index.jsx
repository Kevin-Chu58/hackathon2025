import { Container, Stack, Grid2 as Grid } from "@mui/material";
import NavTab from "../../component/NavTab";
import { grey } from "@mui/material/colors";
import { SiGitbook } from "react-icons/si";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const homeNavs = [
    {
        name: "Cook Book",
        path: "",
        index: true,
        element: "cook book", // TODO
        startIcon: <SiGitbook />,
    },
    {
        name: "tab2",
        path: "tab2",
        element: "tab 2", // TODO
        // startIcon: <SiGitbook/>,
    },
    {
        name: "tab3",
        path: "tab3",
        element: "tab 3", // TODO
        // startIcon: <SiGitbook/>,
    },
    {
        name: "tab4",
        path: "tab4",
        element: "tab 4", // TODO
        // startIcon: <SiGitbook />,
    },
];

const Home = () => {
    const [navId, setNavId] = useState(0);
    const navigateTo = useNavigate();
    const uri = "/home/";
    const uriFix = "/home";

    useEffect(() => {
        handleNavTabFocus();
    });

    const handleNavTabClick = (path) => {
        navigateTo(uri + path);
    };

    const handleNavTabFocus = () => {
        const currentURL = window.location.pathname;
        const pathParams = currentURL.split("/");
        
        setNavId(pathParams[2] ?? "");
    };

    const isOnNavId = (id) => {
        return navId === id;
    };

    // redirect: /home/ => /home
    if (window.location.pathname === uri) {
        return <Navigate to={uriFix} replace />;
    }

    return (
        <Container maxWidth={false} disableGutters>
            {/* tab bar */}
            <Grid container>
                <Grid
                    size={12}
                    p={0}
                    sx={{
                        background: "black",
                        borderBottom: `1px ${grey[800]} solid`,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            m: 1,
                            mb: 0,
                            width: "fit-content",
                        }}
                    >
                        {homeNavs.map((nav) => (
                            <NavTab
                                key={nav.name}
                                isFocus={isOnNavId(nav.path)}
                                startIcon={nav.startIcon}
                                onClick={() => handleNavTabClick(nav.path)}
                            >
                                {nav.name}
                            </NavTab>
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Routes>
                {homeNavs.map((nav) => (
                    <Route
                        index={nav.index}
                        key={`home-nav-${nav.name}`}
                        element={nav.element}
                        path={nav.path}
                    />
                ))}
                <Route path={"*"} element={<Navigate to="/*" />} />
            </Routes>
        </Container>
    );
};

export default Home;
