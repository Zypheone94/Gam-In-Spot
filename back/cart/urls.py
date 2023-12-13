from django.urls import path
from .views import CartView, AddToCartView, CartProductsView

app_name = "cart"

urlpatterns = [
    path('', CartView.as_view(), name="cart"),
    path('add-to-cart/', AddToCartView.as_view(), name="add-to-cart"),
    path('display-cart/<int:user_id>', CartProductsView.as_view(), name="display-cart")
]