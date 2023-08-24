import './styles/normalize.css'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Cookies from 'js-cookie';

// Import des routes
import MainRoutes from "./routes/MainRoutes.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import CategoryRoutes from "./routes/CategoryRoutes.jsx";
import ProductRoutes from "./routes/ProductRoutes.jsx";

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
        }
    }

    const allRoutes = [...MainRoutes, ...AuthRoutes, ...CategoryRoutes, ...ProductRoutes]
    const router = createBrowserRouter(allRoutes);

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
