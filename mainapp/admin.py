from django.contrib import admin
from .models import Product, Comment, Category

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display=["name", "brand", "category", "quantity", "price", "in_stock"]
    list_filter=["brand", "category", "in_stock"]
    prepopulated_fields = {"slug": ("brand","name",)}

admin.site.register(Product, ProductAdmin)
admin.site.register(Comment)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Category, CategoryAdmin)