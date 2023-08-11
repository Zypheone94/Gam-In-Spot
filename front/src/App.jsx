import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CategoryList from "./components/CategoryList.jsx";
import ProductList from "./components/products/ProductList.jsx";
import ProductDetail from "./components/products/ProductDetail.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
        {
            path: "/category",
            element: <CategoryList/>,
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
