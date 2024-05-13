import React, {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

function ProductList() {

    const [productList, setProductList] = useState([])
    // State qui va contenir ma liste de produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    useEffect(() => {
        const getData = async () => {
            function getSearchParam() {
                const params = new URLSearchParams(window.location.search);
                return params.get('search') || '';
            }

            try {
                let url = 'products/api/product'
                getSearchParam() !== null ?
                    url += `/?search=${getSearchParam()}` : null
                const response = await api(url);
                setProductList(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Products | Gam'in-Spot</title>
                <meta name="description" content="Browse our e-commerce website for an extensive collection of video
                games. Find the perfect game on our product page, featuring top-rated titles and unbeatable deals. About
                this game"  />
                <meta name="keywords" content="videogames gaming games game retro retrogaming ps3 ps4 ps5 nintendo playstation goodies" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <div>
            <h1>Liste des produits</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul>
                    {productList !== null ? productList.map(product => (
                        <li key={product.productId}>
                            <Link to={`/product/${product.productId}`}>{product.title}</Link>
                        </li>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </ul>
            )}
        </div>
        </>

    );
}

export default ProductList
