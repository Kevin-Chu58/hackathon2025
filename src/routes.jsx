import { Navigate } from "react-router-dom";
import Home from "./view/Home";
import NotFound from "./view/NotFound";

const routes = [{
    name: 'home',
    path: '/home/*',
    element: <Home/>,
}, {
    name: '404redirect',
    path: '/*',
    element: <Navigate to="/404" replace />,
}, {
    name: '404notFound',
    path: '/404',
    element: <NotFound/>,
}];

export default routes;