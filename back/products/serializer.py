from rest_framework.serializers import ModelSerializer

from models import Product, Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryId', 'title']

        