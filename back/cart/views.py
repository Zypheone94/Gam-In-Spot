from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartElement, Cart
from users.models import CustomUser
from products.models import Product
from .serializer import CartSerializer

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


class AddToCartView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')  # Récupère l'ID de l'utilisateur depuis les données de la requête
            product_id = request.data.get('product_id')  # Récupère l'ID du produit depuis les données de la requête

            user = CustomUser.objects.get(id=user_id)
            product = Product.objects.get(id=product_id)

            cart, created = Cart.objects.get_or_create(user=user)

            # Vérifie si l'article est déjà dans le panier
            cart_item, item_created = CartElement.objects.get_or_create(cart=cart, product=product)

            # Si l'article est déjà dans le panier, incrémente simplement la quantité
            if not item_created:
                cart_item.quantity += 1
                cart_item.save()

            return Response({"message": "Product added to cart"}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({"message": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)


class AddToCartView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            product_id = request.data.get('product_id')

            user = CustomUser.objects.get(id=user_id)
            product = Product.objects.get(productId=product_id)

            cart, created = Cart.objects.get_or_create(user=user)

            cart_item, item_created = CartElement.objects.get_or_create(cart=cart, product=product)

            if not item_created:
                cart_item.quantity += 1
                cart_item.save()

            return Response({"message": "Product added to cart"}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({"message": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)
