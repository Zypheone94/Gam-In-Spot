import './styles/normalize.css'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Cookies from 'js-cookie';

// Import des pages
import CategoryList from "./pages/categories/CategoryList.jsx";
import ProductList from "./pages/products/ProductList.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import CategoryDetail from "./pages/categories/CategoryDetail.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/user/Login.jsx";

// Import des composants
import Header from "./components/commons/header/Header.jsx";
import Footer from "./components/commons/footer/Footer.jsx";

// Import Reducer
import Store from "./redux/store.jsx";
import {Provider} from 'react-redux';
import {setUser} from './redux/actions/userActions';


function App() {

    function decodeJWT(jwtToken) {
        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Remplacer les caractères spéciaux
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')); // Décoder en JSON

        return JSON.parse(jsonPayload);
    }

    const authToken = Cookies.get('access_token');
    if (authToken) {
        try {
            // Déchiffrez le jeton pour obtenir les données utilisateur
            const decodedPayload = decodeJWT(authToken);

            console.log(decodedPayload)

            const userPayload = {
                id: decodedPayload.user_id,
                email: decodedPayload.email,
                first_name: decodedPayload.first_name,
                last_name: decodedPayload.last_name,
                birthDate: decodedPayload.birth_date_str,
                creationAccountDate: decodedPayload.creation_date_str
            };

            // Dispatchez l'action pour stocker les informations de l'utilisateur dans le store Redux
            Store.dispatch(setUser(userPayload));
        } catch (error) {
            // En cas d'erreur lors du déchiffrement, gérez-la ici
            console.error('Error decoding token:', error);
            console.error('Vous devez vous identifier')
        }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage/>,
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/category",
            element: <CategoryList/>,
        },
        {
            path: "/category/:slug",
            element: <CategoryDetail/>,
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
            <Provider store={Store}>
                <Header/>
                <RouterProvider router={router}/>
                <Footer/>
            </Provider>
        </>

    );
}

export default App
