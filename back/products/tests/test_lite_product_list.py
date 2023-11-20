from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from products.models import Product
from products.serializer import LiteProductSerializer
from datetime import date

class LiteProductListViewTest(APITestCase):

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

    def test_retrieve_all_products(self):
        url = reverse('product:loadProductList')
        response = self.client.post(url, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_retrieve_products_by_seller(self):
        url = reverse('product:loadProductList')
        data = {'seller_id': self.user.id}
        response = self.client.post(url, data)


        self.assertEqual(response.status_code, status.HTTP_200_OK)

        products = Product.objects.filter(seller_id=self.user.id)
        serializer = LiteProductSerializer(products, many=True)

        serialized_data = [dict(item) for item in serializer.data]

        for item in response.data:
            filtered_item = {key: value for key, value in item.items() if key != 'seller'}
            self.assertIn(filtered_item, [dict(i) for i in serialized_data])

