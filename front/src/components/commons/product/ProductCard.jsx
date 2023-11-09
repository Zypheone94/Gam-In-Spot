import DateFormat from "../../../utils/DateFormat.jsx";
import {useNavigate} from "react-router-dom"

const ProductCard = ({productValue}) => {

    const navigate = useNavigate()
    console.log(productValue)

    return (
        <div className='mx-4' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '200px',
            height: '300px',
            cursor: 'pointer'
        }} onClick={() => navigate('/product/' + productValue.slug)}>
            <div style={{
                height: '55%'
            }}>
                <img className='h-full w-full'
                     style={{objectFit: 'cover', objectPosition: '50% 50%', borderRadius: '20px 20px 0 0'}}
                     src={productValue.images ? productValue.images[0] : 'https://i0.wp.com/leszackardises.com/wp-content/uploads/2020/09/D54E7AD0-1B8A-48F6-84E2-BDD90258F445.jpeg?w=1000&ssl=1'}/>
            </div>
            <div className='text-lightPurple px-2' style={{
                height: '45%',
                borderTop: '2px solid #4361EE'
            }}>
                <div className='flex justify-between text-deepPurple'>
                    <p className='font-semibold'>{productValue.title}</p>
                    <p className='font-semibold'>{productValue.price}€</p>
                </div>
                <p>
                    De: {productValue.seller}
                </p>
                <p>
                    Mise en ligne : <DateFormat value={productValue.createdDate}/>
                </p>
            </div>
        </div>
    )
}

export default ProductCard