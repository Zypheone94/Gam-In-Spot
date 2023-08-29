// import Pages
import Homepage from "../pages/Homepage.jsx";
import WrongPage from "../pages/WrongPage.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const MainRoutes = [
    {
        path: "/",
        element: <> <Header/><Homepage/><Footer/> </>,
        errorElement: <WrongPage/>
    },
]

export default MainRoutes