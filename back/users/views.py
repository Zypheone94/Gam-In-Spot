import random

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from rest_framework import status
from django.contrib.auth import logout
import json

from .serializer import CustomUserSerializer
from django.core.mail import send_mail

from django.core.cache import cache


def custom_jwt_payload(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'birth_date_str': user.birthDate.strftime('%Y-%m-%d'),
        'creation_date_str': user.creationAccountDate.strftime('%Y-%m-%d')
        # Ajoutez d'autres champs personnalisés ici
    }
    return payload


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Assurez-vous que vous avez un champ 'email' dans votre formulaire
        password = request.data.get('password')

        # Recherche de l'utilisateur par e-mail
        user = CustomUser.objects.filter(email=email).first()

        if user is not None:
            refresh = RefreshToken.for_user(user)

            access_token = RefreshToken.for_user(user)
            access_token.payload = custom_jwt_payload(user)
            jwt_token = str(access_token)

            return Response({
                'refresh': str(refresh),
                'token': jwt_token,
                'user_info': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'birthDate': user.birthDate,
                    'creationAccountDate': user.creationAccountDate,

                },
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=401)


class UserDetailView(APIView):
    def post(self, request):
        user_id = request.data.get('id')
        if user_id is None:
            return Response({'error': 'ID de l\'utilisateur manquant'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(pk=user_id)
            serializer = CustomUserSerializer(user)
            serialized_data = serializer.data

            return Response({'user': serialized_data})
        except CustomUser.DoesNotExist:
            return Response({'error': 'L\'utilisateur n\'existe pas'}, status=status.HTTP_404_NOT_FOUND)


class UpdateUserView(APIView):
    def put(self, request):
        user_id = request.data.get('id')

        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'L\'utilisateur n\'existe pas'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.get('data', {})

        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.birthDate = data.get('birthDate', user.birthDate)

        user.save()

        return Response({'message': 'Utilisateur mis à jour avec succès'})


class LogoutView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logout successful", "status": status.HTTP_205_RESET_CONTENT})  # Indique que la déconnexion a réussi
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SendValidationMail(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            verification_code = str(random.randint(100000, 500000))
            email = data.get('formMail')
            subject = 'Validation de votre compte'
            message = 'Voici votre code de vérification : ' + verification_code
            from_email = 'magna94320@gmail.com'
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)

            cache.set('cache_data', {'verification_code': verification_code, 'email' : email}, 3600)

            return Response({'message': 'E-mail envoyé avec succès.' }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Erreur lors de l\'envoi de l\'e-mail.'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        print(json.loads(request.body))
        try:
            data = json.loads(request.body)
            user_email = data.get('user_mail')
            entered_code = data.get('check_code')

            cache_data = cache.get('cache_data')

            if CustomUser.objects.filter(email=cache_data['email']).exists():
                return Response({'status_code': 40, 'message': 'Cet e-mail est déjà enregistré.'})

            user = CustomUser.objects.get(email=user_email)
            print(entered_code)
            print(cache_data['verification_code'])

            if entered_code and entered_code == cache_data['verification_code']:
                user.email = cache_data['email']
                user.save()
                return Response({'message': 'Code de vérification valide.', 'status_code': 10}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Code de vérification invalide.', 'status_code': 15}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Erreur lors de la vérification du code.', 'status_code': 20}, status=status.HTTP_400_BAD_REQUEST)
