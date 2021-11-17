from .models import Products
from rest_framework import viewsets, permissions
from .serializers import ProductsSerializer

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.AllowAny]

