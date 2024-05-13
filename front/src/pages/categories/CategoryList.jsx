import React, {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";

import CategoryCard from "../../components/commons/product/CategoryCard.jsx";
import {Helmet} from "react-helmet";

function CategoryList() {

    const [categoryList, setCategoryList] = useState([])
    // State qui va contenir ma liste de category
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    useEffect(() => {
        const getData = async () => {
            function getSearchParam() {
                const params = new URLSearchParams(window.location.search);
                return params.get('search') || '';
            }

            try {
                let url = 'products/api/category'
                getSearchParam() !== null ?
                    url += `/?search=${getSearchParam()}` : null
                const response = await api(url);
                console.log(response)
                let orderValue = response.sort()
                setCategoryList(orderValue);
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
                <title>Categories | Gam'in-Spot</title>
                <meta name="description" content="Browse our e-commerce website for an extensive collection of video
                games. Find the perfect game on our product page, featuring top-rated titles and unbeatable deals. About
                this game"  />
                <meta name="keywords" content="videogames gaming games game retro retrogaming ps3 ps4 ps5 nintendo playstation goodies" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <div>
            <h1 className='text-pink text-xl mt-4 ml-8 mb-10'>Liste des catégories</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className='flex flex-wrap justify-start'>
                    {categoryList !== null ? categoryList.map(category => (
                        <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                            <CategoryCard key={category.categoryId} categorySlug={category.slug}
                                          categoryTitle={category.title}></CategoryCard>
                        </div>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </div>
            )}
        </div>
        </>
    );
}

export default CategoryList
