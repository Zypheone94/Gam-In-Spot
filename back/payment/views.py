from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import stripe
from rest_framework.views import APIView

# Configurez la clé secrète de Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


class TestPaymentSession(APIView):
    @staticmethod
    def post(request):
        if request.method == 'POST':
            try:
                

                return Response(confirm.status)

            except stripe.error.StripeError as e:
                return Response({'error': str(e)}, status=500)

            except Exception as e:
                return Response({'error': str(e)}, status=500)
