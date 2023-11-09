from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.utils.text import slugify
from django.utils import timezone
import os
import requests

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


class ProductDetailView(APIView):
    def get(self, request, productSlug):

        def check_url_status(url):
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    return True
                else:
                    return False
            except requests.exceptions.RequestException as e:
                print(f"Impossible d'accéder à l'URL {url}. Erreur : {e}")

        try:
            product = Product.objects.get(slug=productSlug)
            serializer = ProductSerializer(product)

            seller = CustomUser.objects.get(pk=serializer.data['seller_id'])
            data = serializer.data
            data['seller'] = seller.__str__()

            images = []

            for i in range(1, 4):
                url = f"http://localhost:8000/static/{data['seller']}/{data['slug']}/image_{i}.jpg"
                if check_url_status(url):
                    images.append(url)
                else:
                    None

            if len(images) == 0:
                None
            else:
                data['images'] = images

            return Response(data)
        except Product.DoesNotExist:
            return Response({'message': 'Produit non trouvé', 'error': 100}, status=status.HTTP_404_NOT_FOUND)


class ProductCreateView(APIView):
    def post(self, request):

        data = request.data.copy()
        print(data['edition'])

        try:
            seller_username = CustomUser.objects.get(id=data['seller_id'])
            user_directory = os.path.join(os.path.dirname(__file__), f"static/{seller_username}/")
            if not os.path.exists(user_directory):
                os.mkdir(user_directory)
                print(f"Le dossier '{seller_username}' a été créé.")
            else:
                print(f"Le dossier '{seller_username}' existe déjà.")
        except CustomUser.DoesNotExist:
            seller_username = None

        title = data.get('title')
        if seller_username and title:
            base_slug = slugify(f"{seller_username}-{title}")
            unique_slug = self.generate_unique_slug(base_slug)
            data['slug'] = unique_slug

            slug_directory = os.path.join(os.path.dirname(__file__), f"static/{seller_username}/", unique_slug)

            if not os.path.exists(slug_directory):
                os.mkdir(slug_directory)
                print(f"Le sous-dossier '{unique_slug}' a été créé.")
            else:
                print(f"Le sous-dossier '{unique_slug}' existe déjà.")

            if 'images[]' in request.FILES:
                for i, file in enumerate(request.FILES.getlist('images[]'), start=1):
                    new_file_name = f"image_{i}{os.path.splitext(file.name)[-1]}.jpg"

                    with open(os.path.join(slug_directory, new_file_name), 'wb') as destination:
                        for chunk in file.chunks():
                            destination.write(chunk)

                    print(f"Le fichier '{file.name}' a été stocké en tant que '{new_file_name}' dans '{unique_slug}'.")

        data['createdDate'] = timezone.now().date()

        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data' : serializer.data, 'code': 200}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_unique_slug(self, base_slug):
        slug = base_slug
        counter = 1

        while Product.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug


class AddProductCategories(APIView):
    def post(self, request):
        data = request.data
        print(data)
        product_id = request.data.get('product_id')

        if not product_id:
            return Response({'message': 'Veuillez fournir un ID de produit'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(productId=product_id)
        except Product.DoesNotExist:
            return Response({'message': 'Le produit n\'existe pas'}, status=status.HTTP_404_NOT_FOUND)

        category_ids = request.data.get('category_ids')
        print('t', category_ids)
        for category in category_ids:
            print(category)

            product.category.add(category)

        product.save()

        print("product_id:", product_id)
        print("categories:", category_ids)

        return Response({'message': 'Catégories ajoutées au produit avec succès', 'code': 200}, status=status.HTTP_200_OK)


class LoadCategory(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
