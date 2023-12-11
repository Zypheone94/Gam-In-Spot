import Cart from "../pages/cart/Cart.jsx";

import Header from "../components/commons/header/Header.jsx";
import Footer from "../components/commons/footer/Footer.jsx";

const PaymentRoutes = [
    {
        path: '/cart',
        element: <> <Header/><Cart/><Footer/> </>,
    }
]

export default PaymentRoutes