import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {nommage} from "../../../utils/nommage.jsx";
import DateFormat from "../../../utils/DateFormat.jsx";

const CategoryCard = ({categorySlug, categoryTitle}) => {

    const [imageExists, setImageExists] = useState()

    const checkImageExist = (categorie) => {
        const img = new Image();
        img.src = `../../src/assets/images/category/${categorie}.jpg`;
        img.onload = () => {
            setImageExists(img.src);
            console.log('ok')
        };
        img.onerror = () => {
            setImageExists(false);
            console.log('nope')
        };
    }

    const navigate = useNavigate()

    useEffect(() => {
        checkImageExist(categoryTitle)
    }, [])

    return (
        <div className='mx-8 my-4' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '200px',
            height: '300px',
            cursor: 'pointer',
        }} onClick={() => navigate('/category/' + categorySlug)}>
            {categoryTitle}
            <img src={imageExists}/>
        </div>
    )
}

export default CategoryCard