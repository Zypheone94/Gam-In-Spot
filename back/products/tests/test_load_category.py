from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from products.models import Category
from products.serializer import CategorySerializer

class LoadCategoryViewTest(APITestCase):

    def test_load_categories(self):
        url = reverse('product:loadCategory')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        self.assertEqual(response.data, serializer.data)
