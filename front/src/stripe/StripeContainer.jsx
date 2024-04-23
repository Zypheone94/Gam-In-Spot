import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm.jsx";
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

const stripeTestPromise = loadStripe(stripeKey)

const StripeContainer = ({totalPrice}) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm totalPrice={totalPrice}/>
        </Elements>
    )
}

export default StripeContainer