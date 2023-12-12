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
                new_cart = Cart.objects.create(user=user)
                new_cart_serializer = CartSerializer(new_cart)
                return Response(new_cart_serializer.data, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
