from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from products.models import Product
import os

class ProductCreateViewTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='seller@example.com',
            username='seller',
            password='sellerpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )
        self.url = reverse('product:createProduct') 

    def test_create_product(self):
        data = {
            'title': 'Titre du produit',
            'seller_id': self.user.id,
            'price': 29.99,
            'plateform': "Plateforme du produit",
            'productDescription': "Description du produit",
            'edition': 'edition du produit'
        }

        response = self.client.post(self.url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Product.objects.filter(title='Titre du produit').exists())
