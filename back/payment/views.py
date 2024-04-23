from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
import environ
import stripe
from rest_framework.views import APIView

env = environ.Env()
print(env("STRIPE_SECRET_KEY"))

# Configurez la clé secrète de Stripe
stripe.api_key = env("STRIPE_SECRET_KEY")


class PaymentSession(APIView):
    @staticmethod
    def post(request):
        if request.method == 'POST':
            try:
                amount = request.data.get('amount')
                payment_method_id = request.data.get('id')

                session = stripe.PaymentIntent.create(

                    amount=amount,
                    currency="Eur",
                    payment_method=payment_method_id,
                )

                payment_intent_id = session.id
                payment_method_key = session.payment_method

                confirm = stripe.PaymentIntent.confirm(
                    payment_intent_id,
                    payment_method=payment_method_key,
                    return_url='https://gaminspot.games/profil'
                )

                return Response(confirm.status)

            except stripe.error.StripeError as e:
                return Response({'error': str(e)}, status=500)

            except Exception as e:
                return Response({'error': str(e)}, status=500)
