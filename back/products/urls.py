from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from .views import CategoryViewSet, ProductViewSet, ProductCreateView, ProductDetailView, LoadCategory, \
    AddProductCategories, LiteProductListView, DeleteProductView

app_name = 'product'

router = routers.SimpleRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('product', ProductViewSet, basename='product')

urlpatterns = [
    path('api/', include(router.urls)),
    path('product/create', ProductCreateView.as_view(), name='create'),
    path('product/loadcat', LoadCategory.as_view(), name='loadCategory'),
    path('product/add-categories', AddProductCategories.as_view(), name='addCategories'),
    path('product/loadProductList', LiteProductListView.as_view(), name='loadProductList'),
    path('product/delete-product-list', DeleteProductView.as_view(), name='deleteProductList'),
    path('read-product/<str:productSlug>', ProductDetailView.as_view(), name='detailProduct'),
]
