import Clients from "./components/Clients";
import ClientDetails from "./components/ClientDetails";
import LoginForm from "./components/LoginForm";
import Add from "./components/Add";
import EditClientDetails from "./components/EditClientDetails";
import RegisterForm from "./components/RegisterForm";

const AppRoutes = [
    {
        index: true,
        element: <Clients/>
    },
    {
        path: '/:id',
        element: <ClientDetails />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
    {
        path: '/add',
        element: <Add />
    },
    {
        path: '/:id/edit',
        element: <EditClientDetails />
    },
];

export default AppRoutes;
