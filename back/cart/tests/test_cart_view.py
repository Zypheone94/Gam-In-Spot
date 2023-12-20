from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from cart.models import Cart


class CartViewTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='seller@example.com',
            username='seller',
            password='sellerpassword',
            birthDate="1990-01-01",
            first_name='John',
            last_name='Doe'
        )

        self.url = reverse('cart:cart')

    def test_get_existing_cart(self):
        Cart.objects.create(user=self.user)
        self.client.force_login(self.user)
        response = self.client.get(self.url + f'?user_id={self.user.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_cart_for_new_user(self):
        new_user = CustomUser.objects.create(
            email='new@example.com',
            username='new_user',
            password='newpassword',
            birthDate="1990-01-01",
            first_name='John',
            last_name='Doe'
        )
        self.client.force_login(new_user)
        response = self.client.get(self.url + f'?user_id={new_user.id}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_found(self):
        non_existing_user_id = 9999  # Un ID qui n'existe pas dans la base de données
        response = self.client.get(self.url + f'?user_id={non_existing_user_id}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
