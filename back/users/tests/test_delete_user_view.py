from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser


class DeleteUserViewTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='existinglogin@example.com',
            username='existinguser',
            password='existingpassword',
            birthDate='1990-01-01',
            firstName='John',
            lastName='Doe'
        )
        self.url = reverse('users:delete')

    def test_delete_user_success(self):
        client = APIClient()
        data = {'id': self.user.id}
        response = client.delete(self.url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(CustomUser.objects.filter(id=self.user.id).exists())

    def test_delete_user_missing_id(self):
        client = APIClient()
        response = client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_user_error(self):
        client = APIClient()
        invalid_user_id = -1
        data = {'id': invalid_user_id}
        response = client.delete(self.url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


