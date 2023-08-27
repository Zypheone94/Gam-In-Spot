from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Product, Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryId', 'title', 'slug']


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'title', 'price', 'plateform', 'productDescription', 'createdDate', 'category', 'seller']
        