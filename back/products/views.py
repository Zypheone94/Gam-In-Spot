from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Category, Product

from .serializer import CategorySerializer, ProductSerializer


class CategoryViewSet(ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']
    lookup_field = 'slug'

    @action(detail=False, methods=['get'])
    def get_category(self, request):
        slug = request.query_params.get('slug')
        if slug:
            try:
                category = self.queryset.get(slug=slug)
                serializer = self.serializer_class(category)
                return Response(serializer.data)
            except Category.DoesNotExist:
                return Response({'error': 'Category not found'}, status=404)
        else:
            return Response({'error': 'Slug parameter missing'}, status=400)


class ProductViewSet(ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']

    @action(detail=False, methods=['get'])
    def search_by_category(self, request):
        category = request.query_params.get('category')
        if category:
            products = self.queryset.filter(category__in=[category])
            serializer = self.serializer_class(products, many=True)
            return Response(serializer.data)
        else:
            return Response([])


