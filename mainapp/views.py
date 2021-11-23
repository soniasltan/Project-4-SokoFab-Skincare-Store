from rest_framework.serializers import Serializer
from .models import Product, Category, Comment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import ProductsSerializer

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
    product = get_object_or_404(Product, slug=slug, in_stock=True)
    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)



