from rest_framework.serializers import ModelSerializer
from users.models import CustomUser
from rest_framework import serializers

from .models import Product, Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryId', 'title', 'slug']


class ProductSerializer(ModelSerializer):
    seller = serializers.StringRelatedField()
    print(seller)


    class Meta:
        model = Product
        fields = '__all__'


    def get_seller(self, obj):
        seller_id = obj.seller_id
        try:
            seller = CustomUser.objects.get(pk=seller_id)
            print(seller.username)

            return seller.username
        except CustomUser.DoesNotExist:
            return None