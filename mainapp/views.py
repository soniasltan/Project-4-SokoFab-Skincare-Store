from .models import Product
from rest_framework import viewsets, permissions
from .serializers import ProductsSerializer

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.AllowAny]

