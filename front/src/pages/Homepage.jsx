//import CategoryList from "./components/categories/CategoryList.jsx";
//import ProductList from "./components/products/ProductList.jsx";
//import ProductDetail from "./components/products/ProductDetail.jsx";
//import CategoryDetail from "./components/categories/CategoryDetail.jsx";
import ProductCard from "../components/commons/product/ProductCard.jsx";
import {api} from "../utils/api.jsx";
import {useEffect, useState} from "react";

function Homepage() {

    const [productList, setProductList] = useState()

    useEffect(() => {
        getProductList();
    }, []);

    const getProductList = async () => {
        try {
            const response = await api('products/product/loadProductList', 'POST', {'limit': 5});
            console.log(response);
            setProductList(response)
            console.log(productList)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    return (
        <div>
            <h1 className="font-roboto">Homepage</h1>
            <div className='flex'>
                {
                    productList && productList.map((product, index) =>
                        (
                            <ProductCard productValue={product}/>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Homepage
