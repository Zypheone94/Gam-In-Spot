import {useNavigate} from "react-router-dom"

import X from '../../../assets/images/icons/X.jsx'

import Selector from "../Selector.jsx";
import {useEffect, useState} from "react";

const ProductCartCard = ({product}) => {

    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(product.quantity)

    const changeQuantity = () => {
        console.log('ok')
    }

    useEffect(() => {
        changeQuantity()
    }, [quantity]);


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
                        <p className='font-semibold cursor-pointer flex'
                           onClick={() => navigate('/product/' + product.slug)}>{product.title}</p>
                        <div className='flex items-center'>
                            <p>Quantité : </p>
                            <div style={{
                                minHeight: '30px',
                                marginLeft: '10px'
                            }}><Selector selectorList={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} defaultValue={product.quantity}
                                         setValue={setQuantity} width="50px" openHeight="100px"/></div>
                        </div>

                    </div>

                    <div className='flex justify-between'>
                        <X color='red'/>
                        <p className='font-semibold text-right'>{product.price}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCartCard