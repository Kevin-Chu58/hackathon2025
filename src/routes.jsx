import { Navigate } from "react-router-dom";
import Home from "./view/Home";
import NotFound from "./view/NotFound";
import Cooking from "./view/Cooking";

const routes = [{
    name: 'home',
    path: '/home/*',
    element: <Home/>,
}, {
    name: 'cooking',
    path: '/cooking/*',
    element: <Cooking/>,
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