import ProductList from "../pages/products/ProductList.jsx";
import ProductDetail from "../pages/products/ProductDetail.jsx";

// Import Components
import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const ProductRoutes = [
    {
        path: "/product",
        element: <><Header/> <ProductList/> <Footer/></>,
    },
    {
        path: "/product/:productId",
        element: <><Header/> <ProductDetail/> <Footer/></>,
    },
]

export default ProductRoutes