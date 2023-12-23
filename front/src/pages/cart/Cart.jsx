import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import ProductCartCard from "../../components/commons/product/ProductCartCard.jsx";

const Cart = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [cartContent, setCartContent] = useState([])
    const [totalCart, setTotalCart] = useState()

    const getUserCart = async () => {
        try {
            const req = await api('cart/cart/display-cart/' + user.id, "GET")
            setCartContent(req)
        } catch (err) {
            console.log(err)
        }
    }

    const totalCost = () => {
        let total = 0
        cartContent && cartContent.length > 0 && cartContent.map(element => (
            total += element.price * element.quantity
        ))
        total = Math.round(total * 100) / 100
        setTotalCart(total)
    }

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        } else {
            getUserCart()
        }
    }, []);

    useEffect(() => {
        totalCost()
    }, [cartContent])


    return (
        <>
            <div className='flex items-center mt-4 mb-10 justify-between'>
                <h1 className='text-pink text-xl  ml-8'>Cart</h1>
                {cartContent && cartContent.length > 0 &&
                    <p className='text-pink text-xl mr-8 sm:mr-32'>Total : {totalCart !== '' && totalCart} €</p>}
            </div>
            <div className='flex mt-8 mx-12 mb-10 flex-col sm:flex-row' style={{
                overflowX: "scroll"
            }}>
                {
                    cartContent && cartContent.length > 0 ? cartContent.map((element) => (
                            <ProductCartCard product={element} user={user.id} getUserCart={getUserCart}/>
                        )) :
                        <p>Votre panier est vide</p>
                }
            </div>
            <div className='my-12 ml-4'>
                {
                    cartContent && cartContent.length > 0 && (
                        <button className="cursor-pointer block p-4" style={{
                            border: "1px solid #3A0CA3",
                            borderRadius: "15px",
                            color: '#F72585'
                        }}>Procéder au payement</button>
                    )
                }
            </div>
        </>
    )
}

export default Cart