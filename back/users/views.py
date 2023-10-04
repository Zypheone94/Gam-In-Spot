import json
import random

from django.contrib.auth import logout, authenticate, update_session_auth_hash
from django.contrib.auth.hashers import make_password, check_password
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializer import CustomUserSerializer

def custom_jwt_payload(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'birth_date_str': user.birthDate.strftime('%Y-%m-%d'),
        'creation_date_str': user.creationAccountDate.strftime('%Y-%m-%d')
    }
    return payload



class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

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
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class CustomUserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        if CustomUser.objects.filter(email=email).exists():
            return Response({'status': 40}, status=status.HTTP_400_BAD_REQUEST)

        username = request.data.get('username', None)
        if CustomUser.objects.filter(username=username).exists():
            return Response({'status': 50}, status=status.HTTP_400_BAD_REQUEST)

        request.data['password'] = make_password(request.data['password'])

        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 10}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            return Response({"message": "Logout successful",
                             "status": status.HTTP_205_RESET_CONTENT})  # Indique que la déconnexion a réussi
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

            cache.set('cache_data', {'verification_code': verification_code, 'email': email}, 3600)

            return Response({'message': 'E-mail envoyé avec succès.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Erreur lors de l\'envoi de l\'e-mail.'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            data = json.loads(request.body)
            user_email = data.get('user_mail')
            entered_code = data.get('check_code')
            cache_data = cache.get('cache_data')

            if user_email:
                user = CustomUser.objects.get(email=user_email)

                if CustomUser.objects.filter(email=cache_data['email']).exists():
                    print('E-mail déjà enregistré.')
                    return Response({'status_code': 40, 'message': 'Cet e-mail est déjà enregistré.'})

                if entered_code and entered_code == cache_data['verification_code']:
                    user.email = cache_data['email']
                    user.save()
                    return Response({'message': 'Code de vérification valide.', 'status_code': 10},
                                    status=status.HTTP_200_OK)
                else:
                    print('Code de vérification invalide.')
                    return Response({'error': 'Code de vérification invalide.', 'status_code': 15},
                                    status=status.HTTP_400_BAD_REQUEST)

            else:
                print('No user_email provided.')

                if entered_code and entered_code == cache_data['verification_code']:
                    return Response({'message': 'Code de vérification valide.', 'status_code': 10},
                                    status=status.HTTP_200_OK)
                else:
                    print('Code de vérification invalide.')
                    return Response({'error': 'Code de vérification invalide.', 'status_code': 15},
                                    status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print('Erreur lors de la vérification du code:', str(e))
            return Response({'error': 'Erreur lors de la vérification du code.', 'status_code': 20},
                            status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeView(APIView):
    def post(self, request):
        new_password = request.data.get('new_password')
        current_password = request.data.get('actual_password')
        email = request.data.get('email')

        ret = authenticate(request, email=email, password=current_password)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Utilisateur non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

        if authenticate(request, username=email, password=current_password):
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)
            return Response({'message': 'Mot de passe mis à jour avec succès.', 'error': 0}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Mot de passe actuel incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
