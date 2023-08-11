import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CategoryList from "./components/categories/CategoryList.jsx";
import ProductList from "./components/products/ProductList.jsx";
import ProductDetail from "./components/products/ProductDetail.jsx";
import CategoryDetail from "./components/categories/CategoryDetail.jsx";
import Homepage from "./components/Homepage.jsx";
import './index.css'

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
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
        <RouterProvider router={router}/>
    );
}

export default App
