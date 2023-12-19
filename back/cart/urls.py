from django.urls import path
from .views import CartView, AddToCartView, CartProductsView, UpdateCartItemQuantityView, RemoveCartItemView

app_name = "cart"

urlpatterns = [
    path('', CartView.as_view(), name="cart"),
    path('cart/add-to-cart/', AddToCartView.as_view(), name="add-to-cart"),
    path('cart/display-cart/<int:user_id>', CartProductsView.as_view(), name="display-cart"),
    path('cart/update-quantity/<int:user_id>/<int:item_id>/', UpdateCartItemQuantityView.as_view(), name="update-cart"),
    path('cart/delete-item/<int:user_id>/<int:item_id>/', RemoveCartItemView.as_view(), name="delete-item")
]
