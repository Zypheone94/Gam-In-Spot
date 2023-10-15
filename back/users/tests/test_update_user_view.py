from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser

class UpdateUserViewTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create(
            email='test@example.com',
            username='testuser',
            password='testpassword',
            birthDate='1990-01-01',
            first_name='John',
            last_name='Doe'
        )

        self.url = reverse('users:modify_user')

    def test_update_user_success(self):
        data = {
            'id': self.user.id,
            'data': {
                'email': 'updated@example.com',
                'first_name': 'UpdatedFirst',
                'last_name': 'UpdatedLast',
                'birthDate': '1995-05-05',
            }
        }
        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Utilisateur mis à jour avec succès')

        updated_user = CustomUser.objects.get(pk=self.user.id)

        self.assertEqual(updated_user.email, 'updated@example.com')
        self.assertEqual(updated_user.first_name, 'UpdatedFirst')
        self.assertEqual(updated_user.last_name, 'UpdatedLast')
        self.assertEqual(str(updated_user.birthDate), '1995-05-05')

    def test_update_user_user_not_found(self):
        data = {
            'id': 999,
            'data': {
                'email': 'updated@example.com',
                'first_name': 'UpdatedFirst',
                'last_name': 'UpdatedLast',
                'birthDate': '1995-05-05',
            }
        }
        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'L\'utilisateur n\'existe pas')
