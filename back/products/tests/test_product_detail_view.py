from rest_framework.test import APITestCase
from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from products.models import Product
from users.models import CustomUser
from datetime import date

class ProductDetailViewTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='existing@example.com',
            username='existinguser',
            password='existingpassword',
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

    def test_get_existing_product(self):
        url = reverse('product:detailProduct', kwargs={'productSlug': self.product.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nonexistent_product(self):
        url = reverse('product:detailProduct', kwargs={'productSlug': 'produit-inexistant'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_check_url_status(self):
        # Simule une requête à l'API en utilisant self.client.get pour obtenir une réponse HTTP
        url = reverse('product:detailProduct', kwargs={'productSlug': self.product.slug})
        response = self.client.get(url)

        # Vérifie que la réponse a un statut HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
