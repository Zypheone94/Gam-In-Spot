import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {api} from "../../utils/api.jsx";

function ProductDetail() {

    const [productDetail, setProductDetail] = useState([])
    // State qui va contenir tout les détails liées à mon produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    const {productId}= useParams()
    // Récupère l'id de mon produit afin de faire l'appel API correctement

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api(`/products/api/product/${productId}`);
                console.log(response)
                setProductDetail(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <h1>Mon produit</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div>
                    <h1>{productDetail.title}</h1>
                </div>
            )}
        </div>
    );
}

export default ProductDetail
