import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "./routes.jsx";
import NavBar from "./component/NavBar/index.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./view/Login/index.jsx";
import { useEffect } from "react";

function App() {
    const { isLoading, isAuthenticated } = useAuth0();

    useEffect(() => {});

    const getDestination = (logoffEle, loginEle) => {
        return !isLoading && isAuthenticated ? loginEle : logoffEle;
    };

    return (
        <>
            <NavBar />
            <Routes>
                <Route
                    key="login"
                    path=""
                    element={getDestination(
                        <Login />,
                        <Navigate to="/home/" replace />
                    )}
                />
                {routes.map((route) => (
                    <Route
                        key={route.name}
                        path={route.path}
                        element={getDestination(
                            <Navigate to="" replace />,
                            route.element
                        )}
                    />
                ))}
            </Routes>
        </>
    );
}

export default App;
