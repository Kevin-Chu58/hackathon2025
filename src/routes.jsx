import Home from "./view/Home";
import NotFound from "./view/NotFound";

const routes = [{
    name: 'home',
    path: '/home/*',
    element: <Home/>,
}, {
    name: 'notFound',
    path: '/*',
    element: <NotFound/>,
}];

export default routes;