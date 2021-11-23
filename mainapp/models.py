from django.db import models
from django.db.models.deletion import CASCADE
from django.core.validators import MinValueValidator, MaxValueValidator
from user.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=None, related_name="product")
    image = models.TextField(default="https://www.beavertontkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg")
    description = models.TextField()
    ingredients = models.TextField()
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    slug = models.SlugField(max_length=100, null=True, unique=True)
    in_stock = models.BooleanField(default=True)

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

