from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    image = models.TextField()
    description = models.TextField()
    ingredients = models.TextField()
    price = models.IntegerField()
    # add comments here?

    def __str__(self):
        return self.brand + " - " + self.name

class Comment(models.Model):
    username = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return "[" + self.date + "] " + self.username