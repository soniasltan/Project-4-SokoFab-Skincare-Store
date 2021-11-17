from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    price = models.IntegerField()