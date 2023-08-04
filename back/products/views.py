from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Category, Product


from .serializer import CategorySerializer, ProductSerializer

class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all()
