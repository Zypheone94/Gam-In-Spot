from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser

class LogoutViewTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create(
            email='test@example.com',
            username='testuser',
            password='testpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )

        self.url = reverse('users:logout')

    def test_logout_success(self):
        response = self.client.post(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_logout_not_authenticated(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Logout successful')
