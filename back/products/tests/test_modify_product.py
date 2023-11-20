from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from products.models import Product
from products.serializer import ProductSerializer
from datetime import date

class ModifyProductViewTest(APITestCase):

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
        self.url = reverse('product:ModifyProduct', kwargs={'slug': self.product.slug})
        self.updated_data = {
            'title': 'Nouveau titre',
            'price': 39.99,
            'productDescription': 'Nouvelle description',
        }

    def test_modify_existing_product(self):
        response = self.client.put(self.url, self.updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Produit mis à jour avec succès.")

    def test_modify_nonexistent_product(self):
        non_existing_slug = 'non-existing-slug'
        url = reverse('product:ModifyProduct', kwargs={'slug': non_existing_slug})
        response = self.client.put(url, self.updated_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['message'], "Le produit n'existe pas.")

