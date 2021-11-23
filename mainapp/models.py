from django.db import models
from django.db.models.deletion import CASCADE
from django.core.validators import MinValueValidator, MaxValueValidator
from user.models import User

class Product(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    image = models.TextField()
    description = models.TextField()
    ingredients = models.TextField()
    price = models.IntegerField()
    slug = models.SlugField(max_length=250, null=True)

    def __str__(self):
        return self.brand + " - " + self.name

class Comment(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name="comments")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=None, related_name="comments")
    rating = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)])
    created_on = models.DateField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return "[" + str(self.created_on) + "] " + self.username.username