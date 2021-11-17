from .models import Products
from django.contrib.auth.models import User, Group
from rest_framework import serializers

class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'name', 'brand', 'type', 'price']