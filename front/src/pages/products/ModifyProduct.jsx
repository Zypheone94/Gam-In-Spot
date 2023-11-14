import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'

import {api} from "../../utils/api.jsx";
import WrongPage from "../WrongPage.jsx";

import ModifyProductForm from "../../components/forms/ModifyProductForm.jsx";

const ModifyProduct = () => {

    const [productDetail, setProductDetail] = useState(null)
    const [display404, setDisplay404] = useState(false)
    const [loading, setLoading] = useState(true)


    const locate = useLocation().pathname

    useEffect(() => {
        const slug = locate.split('/').slice(3).join('/')
        getProductData(slug)
        // changeProductData(slug)
        console.log(productDetail)

    }, []);

    const getProductData = async (slug) => {
        try {
            const response = await api(`products/read-product/${slug}`);
            setProductDetail(response);
            if (response.error === 100) {
                setDisplay404(true)
            }
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    const changeProductData = async (slug) => {
        try {
            const response = await api(`products/product/modify/${slug}`, "PUT", {});
            console.log(response);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <section>
            {loading ? (
                <p>Chargement...</p>
            ) : (

                display404 === true ? (
                    <WrongPage/>
                ) : (
                    <ModifyProductForm productDetail={productDetail} setProductDetail={setProductDetail}/>
                )

            )}
        </section>)
}

export default ModifyProduct