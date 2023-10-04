from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser

class PasswordChangeViewTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='testpassword@example.com',
            username='testpassworduser',
            password='testpassword',
            birthDate='1990-01-01',
            firstName='John',
            lastName='Doe'
        )
        self.url = reverse('users:password')

    def test_password_change_success(self):
        data = {
            'email': 'testpassword@example.com',
            'actual_password': 'testpassword',
            'new_password': 'newpassword123',
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

        login_response = self.client.post(reverse('users:login'),
                                          data={'email': 'testpassword@example.com', 'password': 'newpassword123'})
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
