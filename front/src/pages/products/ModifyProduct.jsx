import {useEffect} from "react";
import {useLocation} from 'react-router-dom'

import {api} from "../../utils/api.jsx";

const ModifyProduct = () => {

    const locate = useLocation().pathname

    useEffect(() => {
        const slug = locate.split('/').slice(3).join('/')
        console.log(slug)
        changeProductData(slug)
    }, []);

    const changeProductData = async (slug) => {
        try {
            const response = await api(`products/product/modify/${slug}`, "PUT", {});
            console.log(response);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            Modify product page
        </>
    )
}

export default ModifyProduct