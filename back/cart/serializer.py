from rest_framework import serializers
from .models import Cart, CartElement


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartElementSerializer(serializers.ModelSerializer):
    productId = serializers.IntegerField(source='product.productId')
    title = serializers.CharField(source='product.title')
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)
    slug = serializers.CharField(source='product.slug')

    class Meta:
        model = CartElement
        fields = ('productId', 'title', 'price', 'slug', 'image')
