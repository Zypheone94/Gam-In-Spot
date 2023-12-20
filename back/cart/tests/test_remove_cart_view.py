from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from cart.models import CartElement, Cart
from users.models import CustomUser
from products.models import Product
from datetime import date


class RemoveCartItemViewTestCase(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='seller@example.com',
            username='seller',
            password='sellerpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )
        self.product = Product.objects.create(
            title="Titre du produit",
            slug="slug-du-produit",
            price=29.99,
            plateform="Plateforme du produit",
            productDescription="Description du produit",
            createdDate=date.today(),
            seller_id=self.user,
            edition="Édition du produit"
        )

        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartElement.objects.create(cart=self.cart, product_id=self.product.productId, quantity=1)
        self.url = reverse('cart:delete-item', args=[self.user.id, self.cart_item.product_id])

    def test_remove_cart_item(self):

        response = self.client.delete(self.url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Cart item deleted successfully')

        with self.assertRaises(CartElement.DoesNotExist):
            CartElement.objects.get(id=self.cart_item.id)

    def test_remove_cart_item_invalid_user(self):
        url = reverse('cart:delete-item', args=[999, self.cart_item.product_id])  # Invalid user ID

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_remove_cart_item_invalid_cart_item(self):
        url = reverse('cart:delete-item', args=[self.user.id, 999])  # Invalid cart item ID

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)