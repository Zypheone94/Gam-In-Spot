from django.urls import path
from .views import CartView, AddToCartView

app_name = "cart"

urlpatterns = [
    path('', CartView.as_view(), name="cart"),
    path('add-to-cart/', AddToCartView.as_view(), name="add-to-cart"),
]