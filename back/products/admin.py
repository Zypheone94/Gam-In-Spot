from django.contrib import admin

from .models import Product, Category


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'get_categories'
    )

    readonly_fields = [
        'slug',
        'createdDate',
    ]

    def get_categories(self, obj):
        return "\n".join([p.title for p in obj.category.all()])


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'title',
    ]

    readonly_fields = [
        'slug',
    ]
