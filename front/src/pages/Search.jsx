import {useEffect, useState} from "react";

import {useLocation} from 'react-router-dom';

const Search = () => {

    const location = useLocation()
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setSearchValue(location.search.substring(2))
    }, [])

    return (
        <>
            <div>
                <h1 className='text-pink text-xl mt-2 ml-8 mb-10'>Recherche : {searchValue}</h1>

                <div>
                    <h3 className='text-pink mt-2 ml-8 mb-10'>Recherche par Catégorie</h3>
                    ici la liste des categories contenu dans la recherche
                </div>

                <div>
                    <h3 className='text-pink mt-2 ml-8 mb-10'>Recherche par Produit</h3>
                    la même mais en fonction du produit
                </div>
            </div>
        </>
    )
}

export default Search