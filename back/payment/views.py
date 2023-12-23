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
            # Créez une session de paiement avec Stripe
            try:
                session = stripe.checkout.Session.create(
                    payment_method_types=['card'],
                    line_items=[{
                        'price_data': {
                            'currency': 'eur',
                            'product_data': {
                                'name': 'Nom du produit',
                                # Autres détails du produit...
                            },
                            'unit_amount': 2000,  # Montant en centimes (par exemple 20 EUR)
                        },
                        'quantity': 1,
                    }],
                    mode='payment',
                    success_url='http://votre-site.com/success',
                    cancel_url='http://votre-site.com/cancel',
                )
                return Response({'id': session.id})
            except Exception as e:
                return Response({'error': str(e)}, status=500)
        else:
            return Response({'error': 'Méthode non autorisée'}, status=405)
