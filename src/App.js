import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./routes.jsx";
import NavBar from "./component/NavBar/index.jsx";

function App() {
    return (
        <>
            <NavBar/>
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.name}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </>
    );
}

export default App;
