import DateFormat from "../../../utils/DateFormat.jsx";
import {useNavigate} from "react-router-dom"

import {nommage} from "../../../utils/nommage.jsx";

const ProductCartCard = ({product}) => {

    const navigate = useNavigate()

    return (
        <div className='mx-4 my-4' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '220px',
            height: '300px',
        }}>
            <div style={{
                height: '55%'
            }}>
                <img className='h-full w-full'
                     style={{objectFit: 'cover', objectPosition: '50% 50%', borderRadius: '20px 20px 0 0'}}
                     src={product.image ? product.image : '../../src/assets/images/Placeholder.jpg'}/>
            </div>
            <div className='text-lightPurple p-2 flex flex-col justify-between' style={{
                height: '45%',
                borderTop: '2px solid #4361EE'
            }}>
                <div className='flex flex-col justify-between text-deepPurple h-full'>
                    <div className='flex flex-col'>
                        <p className='font-semibold w-full cursor-pointer'
                           onClick={() => navigate('/product/' + product.slug)}>{product.title}</p>
                        <p>Quantité : x{product.quantity}</p>
                    </div>

                    <div className='flex justify-between'>
                        <p className='text-xl'
                            style={{
                            cursor: 'pointer',
                            color: 'red'
                        }}>X</p>
                        <p className='font-semibold text-right'>{product.price}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCartCard