import './styles/normalize.css'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Import des pages
import CategoryList from "./pages/categories/CategoryList.jsx";
import ProductList from "./pages/products/ProductList.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import CategoryDetail from "./pages/categories/CategoryDetail.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/user/Login.jsx"

// Import des composants
import Header from "./components/commons/header/Header.jsx";
import Footer from "./components/commons/footer/Footer.jsx"

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/category",
            element: <CategoryList/>,
        },
        {
            path: "/category/:slug",
            element: <CategoryDetail />,
        },
        {
            path: "/product",
            element: <ProductList/>,
        },
        {
            path: "/product/:productId",
            element: <ProductDetail/>,
        },
    ]);

    return (
        <>
            <Header/>
            <RouterProvider router={router}/>
            <Footer/>
        </>

    );
}

export default App
