from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from cart.models import CartElement, Cart
from users.models import CustomUser
from products.models import Product
from datetime import date


class UpdateCartItemQuantityViewTestCase(APITestCase):

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

        self.url = reverse('cart:update-cart', args=[self.user.id, self.cart_item.product_id])

    def test_update_cart_item_quantity(self):
        new_quantity = 5

        data = {
            'quantity': new_quantity
        }

        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Cart item quantity updated successfully')

        updated_cart_item = CartElement.objects.get(id=self.cart_item.id)
        self.assertEqual(updated_cart_item.quantity, new_quantity)

    def test_update_cart_item_quantity_invalid_user(self):
        invalid_user_id = 999
        new_quantity = 5

        data = {
            'quantity': new_quantity
        }

        response = self.client.put(
            reverse('cart:update-cart', args=[invalid_user_id, self.cart_item.product_id]), data,
            format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_cart_item_quantity_invalid_cart_item(self):

        new_quantity = 5

        data = {
            'quantity': new_quantity
        }

        response = self.client.put(
            reverse('cart:update-cart', args=[self.user.id, 999]), data,
            format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
