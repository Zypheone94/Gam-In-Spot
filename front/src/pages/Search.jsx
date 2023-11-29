import {useEffect, useState} from "react";
import {api} from "../utils/api.jsx";

import {useLocation} from 'react-router-dom';

import CategoryCard from "../components/commons/product/CategoryCard.jsx";
import ProductCard from "../components/commons/product/ProductCard.jsx";

const Search = () => {

    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [categoryList, setCategoryList] = useState()
    const [productList, setProductList] = useState()

    useEffect(() => {
        setSearchValue(location.search.substring(2))
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                let url = `/products/api/category/`
                const response = await api(url);
                let orderValue = response.sort()
                setCategoryList(orderValue);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }

            try {
                setLoading(true)
                const response = await api('products/product/loadProductList', 'POST', {
                    'title': searchValue,
                    'limit': 25
                });
                setProductList(response);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        searchValue && getData();
    }, [searchValue]);

    return (
        <>
            <div>
                <h1 className='text-pink text-xl mt-2 ml-8 mb-10'>Recherche : {searchValue}</h1>

                <div>
                    <h3 className='text-pink mt-2 ml-8 mb-10'>Recherche par Catégorie</h3>
                    <div className='flex flex-wrap justify-start'>
                        {
                            categoryList && categoryList.map((cat) => {
                                return cat.title.toLowerCase().includes(searchValue.toLowerCase()) && (
                                    <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                                        <CategoryCard key={cat.slug} categoryTitle={cat.title} categorySlug={cat.slug}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3 className='text-pink mt-2 ml-8 mb-10'>Recherche par Produit</h3>
                    <div className='flex flex-wrap justify-start'>
                        {
                            !loading && productList && productList.map((product) => (
                                <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/5'>
                                    <ProductCard key={product.slug} productValue={product}/>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search