from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.utils.text import slugify
from django.utils import timezone

from .models import Category, Product
from users.models import CustomUser

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


class ProductCreateView(APIView):
    def post(self, request):

        data = request.data
        seller_id = data.get('userId')

        try:
            seller_username = CustomUser.objects.get(id=seller_id).username
            data['seller'] = seller_id
        except CustomUser.DoesNotExist:
            seller_username = None

        title = data.get('title')
        if seller_username and title:
            data['slug'] = slugify(f"{seller_username}-{title}")

        data['createdDate'] = timezone.now().date()

        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



