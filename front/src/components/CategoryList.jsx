import {useState, useEffect} from "react";
import {api} from "../utils/api.jsx";

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
                <ul>
                    {categoryList !== null ? categoryList.map(category => (
                        <li key={category.categoryId}>{category.title}</li>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </ul>
            )}
        </div>
    );
}

export default CategoryList
