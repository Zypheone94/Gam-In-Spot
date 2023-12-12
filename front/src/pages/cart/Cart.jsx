import {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Cart = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const getUserCart = async () => {
        try {
            const request = await api('cart/?user_id=' + user.id, "GET")
            console.log(request.data)
        } catch (err) {
            console.log(err)
        }
    }

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
                Cart
            </div>
        </>
    )
}

export default Cart