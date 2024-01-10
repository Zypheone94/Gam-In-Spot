from django.urls import path, include

from .views import PaymentSession

urlpatterns = [
    path('payement', PaymentSession.as_view(), name="payement")
]
