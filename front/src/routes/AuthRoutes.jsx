// Import Pages
import Login from "../pages/user/Login.jsx";
import Logout from "../pages/user/Logout.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";
import Profile from "../pages/user/Profile.jsx";

const AuthRoutes = [
    {
        path: "/login",
        element: <><Header/><Login/><Footer/></>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
    {
        path: '/profile',
        element: <><Header/><Profile/><Footer/></>
    }
]

export default AuthRoutes