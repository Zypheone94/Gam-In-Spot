from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Assurez-vous que vous avez un champ 'email' dans votre formulaire
        password = request.data.get('password')

        # Recherche de l'utilisateur par e-mail
        user = CustomUser.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_info': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'birthDate': user.birthDate,
                    'creationAccountDate': user.creationAccountDate
                }
            }
            return Response(response_data)
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
