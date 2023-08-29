// Import Pages
import Login from "../pages/user/Login.jsx";
import Logout from "../pages/user/Logout.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const AuthRoutes = [
    {
        path: "/login",
        element:  <><Header/> <Login/> <Footer/></>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    }
]

export default AuthRoutes