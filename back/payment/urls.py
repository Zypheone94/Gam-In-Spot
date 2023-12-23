from django.urls import path, include

from .views import TestPaymentSession

urlpatterns = [
    path('test', TestPaymentSession.as_view(), name="test")
]
