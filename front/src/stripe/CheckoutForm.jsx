import React from "react";
import {CardElement, AddressElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {api} from "../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const addressElement = elements.getElement('address');
        const {complete, value} = await addressElement.getValue();
        console.log()

        if (complete) {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        city: value.address.city,
                        country: value.address.country,
                        line1: value.address.line1,
                        line2: value.address.line2,
                        postal_code: value.address.postal_code,
                        state: value.address.state,
                    },
                },
            });
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
    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <AddressElement options={{mode: 'shipping'}}/>
            <div className='my-12 ml-4'>
                <button className="cursor-pointer block p-4" style={{
                    border: "1px solid #3A0CA3",
                    borderRadius: "15px",
                    color: '#F72585'
                }}>Procéder au payement
                </button>

            </div>
        </form>
    )
}

export default CheckoutForm