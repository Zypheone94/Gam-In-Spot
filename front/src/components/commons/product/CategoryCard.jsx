import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {nommage} from "../../../utils/nommage.jsx";
import DateFormat from "../../../utils/DateFormat.jsx";

const CategoryCard = ({categorySlug, categoryTitle}) => {

    const navigate = useNavigate()

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

    const changeBackgroundColor = (element) => {
        element.style.backgroundColor = 'rgba(0,0,0,0)';
        element.children[0].style.opacity = 0;
    };

    const restoreBackgroundColor = (element) => {
        element.style.backgroundColor = 'rgba(0,0,0,0.6)';
        element.children[0].style.opacity = 1;
    };

    useEffect(() => {
        checkImageExist(categoryTitle)
    }, [])

    return (
        <div className='mx-4 my-4 w-36 h-52 md:mx-10 md:w-48 md:h-72' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            cursor: 'pointer',
            backgroundImage: `url(${imageExists})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} onClick={() => navigate('/category/' + categorySlug)}>
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: '100%',
                width: '100%',
                borderRadius: '20px',
                transition: 'background-color 0.5s ease',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 1,
            }}
                 onMouseEnter={(e) => changeBackgroundColor(e.target)}
                 onMouseLeave={(e) => restoreBackgroundColor(e.target)}>
                <p style={{
                    color: 'white',
                    opacity: 1,
                    transition: 'opacity 0.4s ease',
                }}>{categoryTitle}</p>
            </div>

        </div>
    )
}

export default CategoryCard