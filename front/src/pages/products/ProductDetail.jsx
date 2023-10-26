import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import WrongPage from "../WrongPage.jsx";
import {nommage} from "../../utils/nommage.jsx";

function ProductDetail() {

    const [productDetail, setProductDetail] = useState([])
    // State qui va contenir tout les détails liées à mon produit
    const [loading, setLoading] = useState(true)
    // State qui va permettre de savoir si les données de l'api sont en cours de récupération
    const [display404, setDisplay404] = useState(false)
    // State qui va retourner la page 404 en cas de produit non trouvé

    const url = window.location.pathname;
    const productSlug = url.split('/').pop();
    // Récupère l'id de mon produit afin de faire l'appel API correctement

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api(`products/product/${productSlug}`);
                setProductDetail(response);
                if (response.error === 100) {
                    setDisplay404(true)
                }
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        getData();
        console.log(productDetail)

    }, [productSlug]);

    return (
        <section className='flex flex-col px-12 py-8 md:mt-60 lg:mt-0'>
            {loading ? (
                <p>Chargement...</p>
            ) : (

                display404 === true ? (
                    <WrongPage/>
                ) : (


                    <>
                        <div className='flex flex-col md:flex-row'>
                            <div id='images' className='md:w-5/12 shadow-2xl'>
                                <img className='rounded-xl h-full'
                                     style={{objectFit: 'cover', objectPosition: '50% 50%'}}
                                     src={productDetail.images ? productDetail.images[0] : 'https://i0.wp.com/leszackardises.com/wp-content/uploads/2020/09/D54E7AD0-1B8A-48F6-84E2-BDD90258F445.jpeg?w=1000&ssl=1'}/>
                            </div>
                            <div id="product_info"
                                 className='flex flex-col md:flex-row rounded-xl mt-12 px-4 py-6 md:mt-0 md:ml-12 md:w-7/12 lg:w-8/12 shadow-lg'
                                 style={{
                                     border: '1px solid #4261EE',
                                     background: '#ebebeb',
                                 }}>
                                <div className='flex flex-col justify-between w-full md:w-3/4 lg:w-4/6'>
                                    <div>
                                        <h1 className='text-purple text-xl font-bold'>{nommage(productDetail.title, 25)}</h1>
                                        <p className='text-lightPurple overflow-y-auto mt-2 mb-4 md:mr-4' style={{
                                            height: '220px',
                                            maxWidth: '550px'
                                        }}>{productDetail.productDescription}</p>
                                    </div>
                                    <p className='text-purple mt-2 md:mt-0'><b className='underline'>Mise en ligne
                                        :</b> {productDetail.createdDate.split('-').reverse().join('/')}</p>
                                </div>
                                <div
                                    className='flex flex-col justify-between md:justify-start lg:justify-between w-full md:w-3/6 lg:w-2/6'>
                                    <div
                                        className='flex justify-between items-center md:flex-col md:items-end my-4 md:my-0'>
                                        <h1 className='text-purple text-xl font-bold'>{productDetail.price}€</h1>
                                        <div style={{
                                            border: '1px solid #5F70BD',
                                            borderRadius: '5px',
                                            padding: '7px',
                                            cursor: 'pointer'
                                        }} onClick={() => navigate('/product-management/create')}>
                                            <p className="text-deepPurple md:text-sm">Ajouter au panier</p>
                                        </div>
                                    </div>
                                    <div className='md:mt-4 lg:mt-0 lg:flex lg:flex-col lg:items-end'>
                                        <p className='text-purple'><b className='underline'>Vendeur
                                            :</b> {productDetail.seller}</p>
                                        <p className='text-purple mt-6'><b className='underline'>Plateforme
                                            :</b> {productDetail.plateform}</p>
                                        <p className='text-purple mt-6'><b className='underline'>Édition
                                            :</b> {productDetail.edition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="api_description" className='rounded-xl w-full mt-12 px-4 py-6 shadow-2xl' style={{
                            border: '1px solid #4261EE',
                            background: '#ebebeb',
                            height: '25vh'
                        }}>
                            <h1 className='text-purple text-lg font-bold'>Description du jeu :</h1>
                            <p className='text-lightPurple'>Récupérer une description depuis l'api</p>
                        </div>
                    </>
                )

            )}
        </section>
    );
}

export default ProductDetail
