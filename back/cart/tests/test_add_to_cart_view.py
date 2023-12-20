from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from cart.models import Cart, CartElement
from users.models import CustomUser
from products.models import Product, Category
from datetime import date

class AddToCartViewTestCase(APITestCase):

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
        self.url = reverse('cart:add-to-cart')

    def test_add_to_cart(self):

        data = {
            'user_id': self.user.id,
            'product_id': self.product.productId,
            'image': 'url_de_l_image.jpg'
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Product added to cart')

    def test_add_to_cart_invalid_user(self):

        data = {
            'user_id': 999,
            'product_id': self.product.productId,
            'image': 'url_de_l_image.jpg'
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_to_cart_invalid_product(self):

        data = {
            'user_id': self.user.id,
            'product_id': -1,
            'image': 'url_de_l_image.jpg'
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
