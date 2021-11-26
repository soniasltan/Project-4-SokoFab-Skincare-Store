from rest_framework.serializers import Serializer
from .models import Product, Category, Comment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ProductsSerializer, CategorySerializer
from django.contrib.postgres.search import SearchVector

# class ProductsViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductsSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@api_view(["GET"])
def productsList(request):
    products = Product.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def showProduct(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)

@api_view(["GET"])
def searchProducts(request):
    products = Product.objects.all()
    query = request.query_params.get("keyword")
    if query is not None:
        products = Product.objects.annotate(search=SearchVector("brand", "name"),).filter(search=query)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def listCategory(request, name):
    category = Product.objects.filter(category__name=name)
    serializer = ProductsSerializer(category, many=True)
    return Response(serializer.data)



