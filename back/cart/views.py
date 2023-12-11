from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartElement
from .serializers import CartElementSerializer
from rest_framework.permissions import IsAuthenticated

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            cart_elements = CartElement.objects.filter(cart__user=user)
            serializer = CartElementSerializer(cart_elements, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartElement.DoesNotExist:
            return Response({"message": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
