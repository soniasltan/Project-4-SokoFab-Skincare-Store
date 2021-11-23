from django.contrib import admin
from .models import Product, Comment, Category

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display=["name", "brand", "category", "quantity", "price", "in_stock"]
    list_filter=["brand", "category", "in_stock"]
    prepopulated_fields = {"slug": ("brand","name",)}

admin.site.register(Product, ProductAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display=["product", "rating", "username"]
    list_filter=["product", "rating"]

admin.site.register(Comment, CommentAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Category, CategoryAdmin)