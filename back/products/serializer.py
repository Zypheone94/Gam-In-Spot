from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Product, Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryId', 'title', 'slug']


class ProductSerializer(ModelSerializer):
    seller_id = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_seller_id(self, obj):
        return obj.seller.id if obj.seller else None