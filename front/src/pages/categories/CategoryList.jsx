import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";

import CategoryCard from "../../components/commons/product/CategoryCard.jsx";

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
                let url = '/products/api/category'
                getSearchParam() !== null ?
                    url += `/?search=${getSearchParam()}` : null
                const response = await api(url);
                console.log(response)
                setCategoryList(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h1>Liste des catégories</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className='flex flex-wrap'>
                    {categoryList !== null ? categoryList.map(category => (
                        <CategoryCard key={category.categoryId} categorySlug={category.slug}
                                      categoryTitle={category.title}></CategoryCard>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </div>
            )}
        </div>
    );
}

export default CategoryList
