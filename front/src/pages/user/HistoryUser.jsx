import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux"

import {api} from "../../utils/api.jsx";
import {useNavigate} from "react-router-dom";

import ProductCard from "../../components/commons/product/ProductCard.jsx";

const HistoryUser = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [productList, setProductList] = useState()

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        } else {
            getAllUserProducts()
            console.log(productList)
        }
    }, [])

    const getAllUserProducts = async () => {
        try {
            const response = await api('products/product/loadProductList', 'POST', {'seller_id': user.id});
            setProductList(response)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }


    return (
        <>
            <h3 className='text-pink'>historique</h3>
            <div className='flex flex-wrap'>
                {
                    productList && productList.length > 0 ?
                        productList.map((product, index) =>

                            (
                                <ProductCard productValue={product}/>
                            )
                        ) :
                        <p>
                            Vous n'avez pas encore de produit mis en ligne
                        </p>
                }
            </div>
        </>

    )
}

export default HistoryUser