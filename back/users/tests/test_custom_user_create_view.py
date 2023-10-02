# users/tests/test_custom_user_create_view.py
import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser
from datetime import datetime


class CustomUserCreateViewTest(APITestCase):
    def setUp(self):
        self.existing_user = CustomUser.objects.create(
            email='existing@example.com',
            username='existinguser',
            password='existingpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )

    def test_create_user_success(self):
        url = reverse('users:create')
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword',
            'birthDate': '1990-01-01',
            'first_name': 'John',
            'last_name': 'Doe',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 2)
        self.assertEqual(CustomUser.objects.last().email, 'test@example.com')
        self.assertEqual(CustomUser.objects.last().username, 'testuser')
        expected_birth_date = datetime.strptime('1990-01-01', '%Y-%m-%d').date()
        self.assertEqual(CustomUser.objects.last().birthDate, expected_birth_date)
        self.assertEqual(CustomUser.objects.last().first_name, 'John')
        self.assertEqual(CustomUser.objects.last().last_name, 'Doe')

    def test_create_user_duplicate_email(self):
        url = reverse('users:create')
        data = {
            'email': 'existing@example.com',
            'username': 'newuser',
            'password': 'newpassword',
            'birthDate': '1990-01-01',
            'first_name': 'John',
            'last_name': 'Doe',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 1)

    def test_create_user_duplicate_username(self):
        url = reverse('users:create')
        data = {
            'email': 'new@example.com',
            'username': 'existinguser',
            'password': 'newpassword',
            'birthDate': '1990-01-01',
            'first_name': 'John',
            'last_name': 'Doe',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 1)
