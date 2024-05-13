import React, {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom';
import {api} from "../../utils/api.jsx";
import ProductCard from "../../components/commons/product/ProductCard.jsx";

import {useNavigate} from "react-router-dom"
import {Helmet} from "react-helmet";

function CategoryDetail() {

    const [categoryDetail, setCategoryDetail] = useState([])
    // Récupération de la catégorie
    const [productList, setProductList] = useState([])
    // Récupération de la liste de produit correspondant à la catégorie sélectionnée
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    const {slug} = useParams()
    // Récupère le slug, afin de récupérer la bonne catégorie
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const responseCat = await api(`products/api/category/get_category/?slug=${slug}`);
                setCategoryDetail(responseCat);

                if (responseCat.categoryId) {
                    await fetchProductsByCategory(responseCat.categoryId);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setLoading(false);
            }
        };

        console.log(categoryDetail)

        const fetchProductsByCategory = async (categoryId) => {
            try {
                const responseProd = await api(`products/api/product/search_by_category/?category=${categoryId}`);
                setProductList(responseProd)
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <>
            <Helmet>
                <title>{slug} | Gam'in-Spot</title>
                <meta name="description" content="Browse our e-commerce website for an extensive collection of video
                games. Find the perfect game on our product page, featuring top-rated titles and unbeatable deals. About
                this game"  />
                <meta name="keywords" content={"videogames gaming games game retro retrogaming " + slug} />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div>
                <h1 className='text-pink text-xl mt-4 ml-8 mb-10 cursor-pointer' onClick={() => navigate('/category')}>Retour</h1>
                <h1 className='text-pink text-xl mt-2 ml-8 mb-10'>{categoryDetail.title}</h1>
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <div className='flex flex-wrap justify-start'>
                        {productList !== null ? productList.map(product => (
                            <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                                <ProductCard productValue={product}/>
                            </div>
                        )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                    </div>
                )}
            </div>
        </>

    );
}

export default CategoryDetail
