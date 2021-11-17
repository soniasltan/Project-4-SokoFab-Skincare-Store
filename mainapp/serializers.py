from .models import Product
from django.contrib.auth.models import User, Group
from rest_framework import serializers

class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'type', 'price']