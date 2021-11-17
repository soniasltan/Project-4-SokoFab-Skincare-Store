from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    price = models.IntegerField()

    def __str__(self):
        return self.brand + " " + self.name