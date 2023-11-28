// import Pages
import Homepage from "../pages/Homepage.jsx";
import WrongPage from "../pages/WrongPage.jsx";
import Search from "../pages/Search.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const MainRoutes = [
    {
        path: "/",
        element: <> <Header/><Homepage/><Footer/> </>,
        errorElement: <> <Header/><WrongPage/> <Footer/> </>
    },
    {
        path: "/search",
        element: <> <Header/><Search/><Footer/></>
    }
]

export default MainRoutes