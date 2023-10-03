from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser

class LoginViewTest(APITestCase):
    def setUp(self):
        self.existing_user = CustomUser.objects.create_user(
            email='existing@example.com',
            username='existinguser',
            password='existingpassword',
            birthDate='1990-01-01',
            firstName='John',
            lastName='Doe'
        )
        self.url = reverse('users:login')

    def test_login_success(self):
        url = reverse('users:login')
        data = {
            'email': 'existing@example.com',
            'password': 'existingpassword',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('token', response.data)

        self.assertEqual(response.data['user_info']['id'], self.existing_user.id)
        self.assertEqual(response.data['user_info']['email'], self.existing_user.email)
        self.assertEqual(response.data['user_info']['username'], self.existing_user.username)

    def test_login_failure_invalid_credentials(self):
        data = {
            'email': 'test@example.com',
            'password': 'wrongpassword',
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
