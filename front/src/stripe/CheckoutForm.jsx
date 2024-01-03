import React from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {api} from "../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        try {
            const id = paymentMethod.id
            const req = await api('payment/test', "POST", {'id': id, 'amount': 2000})
            console.log(req)
            if (req === 'succeeded') {
                navigate('/paiement/success')
            } else {
                navigate('/paiement/failure')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button>Payer</button>
        </form>
    )
}

export default CheckoutForm