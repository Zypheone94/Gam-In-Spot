from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from .views import CategoryViewSet, ProductViewSet, ProductCreateView

app_name = 'product'

router = routers.SimpleRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('product', ProductViewSet, basename='product')

urlpatterns = [
    path('api/', include(router.urls)),
    path('product/create', ProductCreateView.as_view(), name='create')
]
