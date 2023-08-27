import Login from "../pages/user/Login.jsx";
import Logout from "../pages/user/Logout.jsx";

const AuthRoutes = [
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/logout",
        element: <Logout/>
    }
]

export default AuthRoutes