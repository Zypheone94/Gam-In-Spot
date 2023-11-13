import DateFormat from "../../../utils/DateFormat.jsx";
import {useNavigate} from "react-router-dom"

import {nommage} from "../../../utils/nommage.jsx";

const HistoryCard = ({productValue}) => {

    const navigate = useNavigate()

    return (
        <div className='mx-4 w-full mt-6' style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            cursor: 'pointer',
            height: '80px',
        }} onClick={() => navigate('/product/' + productValue.slug)}>

            <div className='text-lightPurple flex h-full'>
                <div className='w-1/4' style={{
                    clipPath: 'polygon(0px 0px, -0.63% 196.25%, 100% 0px)',


                }}>
                    <div className='w-full h-full'
                        style={{
                            borderRadius: '20px 0 20px 20px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundImage: productValue.images ? `url(${productValue.images[0]})` : `url(https://i0.wp.com/leszackardises.com/wp-content/uploads/2020/09/D54E7AD0-1B8A-48F6-84E2-BDD90258F445.jpeg?w=1000&ssl=1)`
                        }}

                    ></div>
                </div>

                <div className='flex justify-between items-center w-full p-2 lg:ml-16'>
                    <p className='font-semibold text-deepPurple flex-1'>{nommage(productValue.title, 12)}</p>
                    <p className='font-semibold text-deepPurple flex-1'>{productValue.price}€</p>
                    <p className='flex-1'>
                        De: {nommage(productValue.seller, 15)}
                    </p>
                    <p className='flex-1'>
                        Mise en ligne : <DateFormat value={productValue.createdDate}/>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default HistoryCard