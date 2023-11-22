import {useNavigate} from "react-router-dom";
import {nommage} from "../../../utils/nommage.jsx";
import DateFormat from "../../../utils/DateFormat.jsx";

const CategoryCard = ({categorySlug, categoryTitle}) => {

    const navigate = useNavigate()

    return (
        <div className='mx-8 my-4' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '200px',
            height: '300px',
            cursor: 'pointer',
        }} onClick={() => navigate('/category/' + categorySlug)}>
            {categoryTitle}
        </div>
    )
}

export default CategoryCard