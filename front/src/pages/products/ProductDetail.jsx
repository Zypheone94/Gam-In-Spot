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
        <section className='flex flex-col px-12 py-8'>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <div className='flex' style={{height: '25vw'}}>
                        <div id='images flex'>
                            <img className='rounded-xl h-full'
                                 src='https://i0.wp.com/leszackardises.com/wp-content/uploads/2020/09/D54E7AD0-1B8A-48F6-84E2-BDD90258F445.jpeg?w=1000&ssl=1'/>
                        </div>
                        <div id="product_info" className='rounded-xl' style={{
                            border: '1px solid #4261EE',
                            background: '#ebebeb',
                            minWidth: '70%'
                        }}>
                            <h1>{productDetail.title}</h1>
                        </div>
                    </div>

                    <div id="api_description" className='rounded-xl w-full mt-12' style={{
                        border: '1px solid #4261EE',
                        background: '#ebebeb',
                        height: '25vh'
                    }}>
                        Lorem ipsum
                    </div>
                </>
            )}
        </section>
    );
}

export default ProductDetail
