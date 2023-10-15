from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser

class UserDetailViewTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create(
            email='testdetail@example.com',
            username='testdetailuser',
            password='testpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )

        self.url = reverse('users:user_detail')

    def test_get_user_detail_success(self):
        data = {'id': self.user.id}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('user', response.data)
        user_data = response.data['user']
        self.assertEqual(user_data['id'], self.user.id)
        self.assertEqual(user_data['email'], self.user.email)

    def test_get_user_detail_missing_id(self):
        response = self.client.post(self.url, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'ID de l\'utilisateur manquant')

    def test_get_user_detail_user_not_found(self):
        data = {'id': 999}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'L\'utilisateur n\'existe pas')
