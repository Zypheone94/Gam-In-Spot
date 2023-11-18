from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from products.models import Product, Category
from datetime import date

class AddProductCategoriesViewTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='seller@example.com',
            username='seller',
            password='sellerpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )
        self.category_1 = Category.objects.create(title='Category 1')

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

        self.url = reverse('product:addCategories')

    def test_add_categories_to_product(self):
        data = {
            'product_id': self.product.productId,
            'category_ids': [self.category_1.categoryId]
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        product = Product.objects.get(productId=self.product.productId)
        categories = product.category.all()

        category_titles = [category.title for category in categories]

        self.assertTrue(self.category_1.title in category_titles)

