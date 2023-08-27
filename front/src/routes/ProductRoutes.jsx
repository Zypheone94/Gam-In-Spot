import ProductList from "../pages/products/ProductList.jsx";
import ProductDetail from "../pages/products/ProductDetail.jsx";

const ProductRoutes = [
    {
        path: "/product",
        element: <ProductList/>,
    },
    {
        path: "/product/:productId",
        element: <ProductDetail/>,
    },
]

export default ProductRoutes