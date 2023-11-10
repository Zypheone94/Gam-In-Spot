import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {api} from "../../utils/api.jsx";

import DateFormat from "../../utils/DateFormat.jsx";
import ProductCard from "../../components/commons/product/ProductCard.jsx";

const Profile = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [productList, setProductList] = useState()
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState({title: "", id: ""});
    const [deleteValue, setDeleteValue] = useState('')
    const [displayWrong, setDisplayWrong] = useState(false)

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        getLastProduct();
    }, []);

    const getLastProduct = async () => {
        try {
            const response = await api('products/product/loadProductList', 'POST', {'limit': 3, 'seller_id': user.id});
            setProductList(response)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    const deleteProduct = async (title, productId, slug) => {
        setDeleteModalData({title: title, id: productId, slug: slug, seller:user.username});
        setDeleteModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        if (deleteModalData.title === deleteValue) {
            try {
                const response = await api("products/product/delete-product-list", "DELETE", {
                    productId: deleteModalData.id,
                    slug: deleteModalData.slug,
                    seller: user.username
                });
                console.log(response);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
            setDisplayWrong(false)
            setDeleteModalOpen(false);
            setDeleteModalData({title: "", id: ""});
        } else {
            console.log(deleteValue)
            setDisplayWrong(true)
        }

        getLastProduct();
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteModalData({title: "", id: ""});
    };

    return (

        <section className='mx-4
        lg:flex lg:f-width'>
            <div className='hidden sm:block lg:hidden' style={{
                height: '15rem',
            }}>

            </div>
            {user !== null ? (
                <>
                    <div className='py-4 px-10
                        lg:w-3/12'
                         style={{
                             border: "1px solid #4361EE",
                             borderRadius: '10px',
                             background: "#EBEBEB",
                         }}>
                        <h3 className='text-pink font-bold'>Information du compte</h3>
                        <div>
                            <p className='text-deepPurple mt-6'><span
                                className='underline font-bold'>Nom :</span> {user.last_name}
                            </p>
                            <p className='text-deepPurple mt-4'><span
                                className='underline font-bold'>Prénom :</span> {user.first_name}</p>
                            {
                                user !== '' && (
                                    <>
                                        <p className='text-deepPurple mt-4'><span
                                            className='underline font-bold'>Date de naissance :</span> <DateFormat
                                            value={user.birthDate}/></p>
                                        <p className='text-deepPurple mt-4 mb-2'><span
                                            className='underline font-bold'>Date de création du compte :</span> <DateFormat
                                            value={user.creationAccountDate}/></p>
                                    </>
                                )
                            }

                        </div>
                    </div>
                    <div className="lg:w-9/12 lg:ml-6">
                        <div className='py-8 px-10 mt-6
                            lg:mt-0'
                             style={{
                                 border: "1px solid #4361EE",
                                 borderRadius: '10px',
                                 background: "#EBEBEB"
                             }}>
                            <h3 className='text-pink font-bold mb-6'>Paramètre du compte</h3>
                            <div className="lg:flex lg:items-center lg:justify-around">
                                <div className='text-deepPurple font-bold py-2 px-4 text-center
                                       lg:w-3/12 lg:h-fit'
                                     style={{
                                         border: '1px solid #4361EE',
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}>
                                    Changer le compte de paiement
                                </div>
                                <div className='text-deepPurple font-bold py-2 px-4 mt-6 text-center
                                    lg:w-3/12 lg:mt-0 lg:ml-4'
                                     style={{
                                         border: '1px solid #4361EE',
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}>
                                    Changer le moyen de paiement
                                </div>
                                <div className='text-deepPurple font-bold py-2 px-4 mt-6 text-center
                                    lg:w-3/12 lg:mt-0 lg:ml-4'
                                     style={{
                                         border: '1px solid #4361EE',
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}
                                     onClick={() => navigate('/profile/modify/data')}>
                                    Changer les informations du compte
                                </div>
                            </div>
                            <div className="lg:flex lg: justify-around">
                                <div className='text-white bg-deleteRed font-bold py-2 px-4 mt-6 mb-6
                                flex items-center justify-center text-center
                                lg:w-3/12 lg:mt-10'
                                     style={{
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}
                                     onClick={() => navigate('/profile/modify/mail')}>
                                    Changer le mail associé au compte
                                </div>
                                <div className='text-white bg-deleteRed font-bold py-2 px-4 mt-6 mb-6
                                flex items-center justify-center text-center
                                lg:w-3/12 lg:mt-10'
                                     style={{
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}
                                     onClick={() => navigate('/profile/modify/password')}>
                                    Changer le mot de passe
                                </div>
                                <div className='text-white bg-deleteRed font-bold py-2 px-4 mt-6 mb-6
                                flex items-center justify-center
                                lg:w-3/12 lg:mt-10'
                                     style={{
                                         borderRadius: '10px',
                                         cursor: 'pointer'
                                     }}
                                     onClick={() => navigate('/profile/delete')}>
                                    SUPPRIMER LE COMPTE
                                </div>
                            </div>
                        </div>
                        <div className='py-4 px-10 my-6'
                             style={{
                                 border: "1px solid #4361EE",
                                 borderRadius: '10px',
                                 background: "#EBEBEB"
                             }}>
                            <h3 className='text-pink font-bold'>Dernier produits en lignes</h3>
                            <div className='flex flex-col mt-8 items-center md:flex-row'>
                                {
                                    productList && productList.length > 0 ?
                                        productList.map((product, index) =>

                                            (
                                                <div className='relative z-0 mt-8 md:mt-0 md:w-1/3 md:flex md:justify-center'>
                                                    <p className='absolute flex justify-center items-center text-xl right-8 lg:right-20'
                                                       style={{
                                                           top: '5px',
                                                           width: '20px',
                                                           height: '20px',
                                                           backdropFilter: 'blur(10px)',
                                                           borderRadius: '10px',
                                                           color: 'red',
                                                           cursor: 'pointer'
                                                       }} onClick={() => {
                                                        deleteProduct(product.title, product.productId, product.slug);
                                                    }}>X</p>
                                                    <ProductCard productValue={product}/>
                                                </div>
                                            )
                                        ) :
                                        <p>
                                            Vous n'avez pas encore de produit mis en ligne
                                        </p>
                                }
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            {isDeleteModalOpen && (
                <div
                    className="modal open"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: "rgba(0, 0, 0, 0.5)",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}

                    onClick={(e) => {
                        if (e.target.classList.contains("modal")) {
                            closeDeleteModal();
                        }
                    }}
                >
                    <div className="modal-content w-5/6 flex flex-col justify-between md:w-3/4 lg:w-1/2" style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        zIndex: 9999,
                        height: '300px'
                    }}>
                        <h2 className='text-pink'>{deleteModalData.title}</h2>
                        <p>Merci d'entrer le titre de votre annonce pour valider sa suppression</p>
                        <input
                            type="text"
                            name="deleteValue"
                            onChange={e => setDeleteValue(e.target.value)}
                            className="w-3/4 p-1 md:w-2/4"
                            style={{
                                border: '1px solid #F72585',
                                borderRadius: '10px'
                            }}
                        />
                        <p style={{color: 'red'}}>{displayWrong ? 'Vous avez entré un titre éroné' : ''}</p>

                        <div className='flex justify-between'>
                            <button className='hover:text-pink' onClick={confirmDeleteProduct}>Confirmer la
                                suppression
                            </button>
                            <button onClick={closeDeleteModal} style={{color: 'red'}}>Annuler</button>
                        </div>
                    </div>
                </div>
            )
            }
        </section>

    )
}

export default Profile