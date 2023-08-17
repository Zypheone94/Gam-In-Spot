import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CategoryList from "./pages/categories/CategoryList.jsx";
import ProductList from "./pages/products/ProductList.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import CategoryDetail from "./pages/categories/CategoryDetail.jsx";
import Homepage from "./pages/Homepage.jsx";
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
