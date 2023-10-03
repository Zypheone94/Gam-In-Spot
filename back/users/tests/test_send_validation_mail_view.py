from django.urls import reverse
from django.core.cache import cache
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser


class SendValidationMailViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_send_mail_success(self):
        data = {'formMail': 'test@example.com'}
        response = self.client.post(reverse('users:validation_mail'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_send_mail_failure(self):
        response = self.client.post(reverse('users:validation_mail'), format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_validate_code_success(self):
        existing_user = CustomUser.objects.create(
            email='test@example.com',
            username='testuser',
            password='testpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )

        data = {'formMail': 'test@example.com'}
        response_send_mail = self.client.post(reverse('users:validation_mail'), data, format='json')
        self.assertEqual(response_send_mail.status_code, status.HTTP_200_OK)

        cache_data = cache.get('cache_data')

        data = {'user_mail': 'test@example.com', 'check_code': cache_data['verification_code']}
        response_validate_code = self.client.put(reverse('users:validation_mail'), data, format='json')
        self.assertEqual(response_validate_code.status_code, status.HTTP_200_OK)
        self.assertIn('message', response_validate_code.data)

    def test_validate_code_failure(self):
        data = {'formMail': 'test@example.com'}
        self.client.post(reverse('users:validation_mail'), data, format='json')

        data = {'user_mail': 'test@example.com', 'check_code': 'incorrect-code'}
        response = self.client.put(reverse('users:validation_mail'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
