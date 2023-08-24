import './styles/normalize.css'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Import des routes
import MainRoutes from "./routes/MainRoutes.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import CategoryRoutes from "./routes/CategoryRoutes.jsx";
import ProductRoutes from "./routes/ProductRoutes.jsx";

// Import des composants
import Header from "./components/commons/header/Header.jsx";
import Footer from "./components/commons/footer/Footer.jsx"

// Import Reducer
import { Provider } from 'react-redux';
import Store from "./redux/store.jsx"


function App() {

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
