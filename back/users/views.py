from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView, View
from .models import CustomUser
from rest_framework import status
from django.contrib.auth import logout

from .serializer import CustomUserSerializer
from django.core.mail import send_mail

from django.http import HttpResponse


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

class UserDetailView(APIView):
    def post(self, request):
        user_id = request.data.get('id')
        if user_id is None:
            return Response({'error': 'ID de l\'utilisateur manquant'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(pk=user_id)
            # Sérialisez l'objet CustomUser en JSON
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
        user.username = data.get('username', user.username)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)

        user.save()

        return Response({'message': 'Utilisateur mis à jour avec succès'})
class LogoutView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logout successful", "status": status.HTTP_205_RESET_CONTENT})  # Indique que la déconnexion a réussi
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SendValidationMail(View):
    def get(self, request):
        subject = 'Validation de votre compte'
        message = 'Cliquez sur le lien suivant pour valider votre compte : http://example.com/validate/12345/'
        from_email = 'magna94320@gmail.com'
        recipient_list = ['maximerene.durand.pro@gmail.com']

        send_mail(subject, message, from_email, recipient_list)
        return HttpResponse('E-mail envoyé avec succès.')