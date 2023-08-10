import {useState, useEffect} from "react";
import {api} from "../utils/api.jsx";

function Category() {

    const [categoryList, setCategoryList] = useState([])
    // State qui va contenir ma liste de category
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    useEffect(() => {
        const getData = async () => {

            try {
                const response = await api('/products/api/category');
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
                    {categoryList.map(category => (
                        <li key={category.categoryId}>{category.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Category
