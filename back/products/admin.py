from django.contrib import admin

from .models import Product, Category



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'title',
    ]

    readonly_fields = [
        'slug',
        'createdDate',
    ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'title',
    ]

    readonly_fields = [
        'slug',
    ]