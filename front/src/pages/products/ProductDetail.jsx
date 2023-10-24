import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {api} from "../../utils/api.jsx";

function ProductDetail() {

    const [productDetail, setProductDetail] = useState([])
    // State qui va contenir tout les détails liées à mon produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération

    const url = window.location.pathname;
    const productSlug = url.split('/').pop();
    // Récupère l'id de mon produit afin de faire l'appel API correctement

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api(`products/product/${productSlug}`);
                setProductDetail(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        getData();
    }, [productSlug]);

    return (
        <section>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <div>
                        <div id='images'>
                            Image
                        </div>
                        <div id="product_info">
                            <h1>{productDetail.title}</h1>
                        </div>
                    </div>

                    <div id="api_description">
                        Lorem ipsum
                    </div>
                </>
            )}
        </section>
    );
}

export default ProductDetail
