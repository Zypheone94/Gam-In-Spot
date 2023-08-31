from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from rest_framework import status
from django.contrib.auth import logout

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

            # Renvoyez la réponse avec le jeton JWT personnalisé
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


class LogoutView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logout successful", "status": status.HTTP_205_RESET_CONTENT})  # Indique que la déconnexion a réussi
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)