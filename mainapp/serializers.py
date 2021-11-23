from .models import Product
from django.contrib.auth.models import Group
from rest_framework import serializers

class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'type', 'price', 'description', 'image', 'ingredients']

# class CategorySerializer

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
