from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from products.models import Product
import shutil
import os
from datetime import date


class DeleteProductViewTest(APITestCase):

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

    def test_delete_existing_product(self):
        url = reverse('product:deleteProduct')
        data = {
            'productId': self.product.productId,
            'slug': self.product.slug,
            'seller': self.user.username
        }
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product_missing_id(self):
        url = reverse('product:deleteProduct')
        data = {
            'slug': self.product.slug,
            'seller': self.user.username
        }
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_nonexistent_product(self):
        url = reverse('product:deleteProduct')
        data = {
            'productId': 99999999,
            'slug': 'nonexistent-slug',
            'seller': 'nonexistent-seller'
        }
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

