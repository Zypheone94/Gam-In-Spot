from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartElement, Cart
from users.models import CustomUser
from .serializer import CartSerializer
from rest_framework.permissions import IsAuthenticated

class CartView(APIView):
    def get(self, request):
        try:
            user_id = request.GET.get('user_id')
            user = CustomUser.objects.get(id=user_id)
            cart = Cart.objects.filter(user=user).first()
            if cart:
                serializer = CartSerializer(cart)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Si le panier n'existe pas, tu peux choisir de renvoyer un message spécifique plutôt que de rappeler la création du panier
                return Response({"message": "Cart does not exist for this user"}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CreateCartView(APIView):
    def post(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            cart = Cart.objects.create(user=user)
            return Response({"message": "Cart created successfully"}, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)