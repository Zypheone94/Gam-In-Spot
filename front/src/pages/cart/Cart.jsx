import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Cart = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const [cartContent, setCartContent] = useState([])

    const getUserCart = async () => {
        try {
            const req = await api('cart/display-cart/' + user.id, "GET")
            setCartContent(req)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(cartContent);
    }, [cartContent]);

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        } else {
            getUserCart()
        }
    }, []);

    return (
        <>
            <div>
                <h1 className='text-pink text-xl mt-4 ml-8 mb-10'>Cart</h1>
            </div>
            <div className='mt-4 ml-8 mb-10'>
                {
                    cartContent && cartContent.map((element) => (
                        <p>{element.title}</p>
                    ))
                }
            </div>
        </>
    )
}

export default Cart