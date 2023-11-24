import {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom';
import {api} from "../../utils/api.jsx";
import ProductCard from "../../components/commons/product/ProductCard.jsx";

function CategoryDetail() {

    const [categoryDetail, setCategoryDetail] = useState([])
    // Récupération de la catégorie
    const [productList, setProductList] = useState([])
    // Récupération de la liste de produit correspondant à la catégorie sélectionnée
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    const {slug} = useParams()
    // Récupère le slug, afin de récupérer la bonne catégorie

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
        <div>
            <h1 className='text-pink text-xl mt-4 ml-8 mb-10'>{categoryDetail.title}</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className='flex mb-12'>
                    {productList !== null ? productList.map(product => (
                        <ProductCard productValue={product}/>
                    )) : <p>Votre recherche n'a rien donnée malheureusement </p>}
                </div>
            )}
        </div>
    );
}

export default CategoryDetail
