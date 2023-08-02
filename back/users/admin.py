from django.contrib import admin
from .models import CustomUser

#admin.site.register(CustomUser)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'first_name',
        'last_name',
        'email',
        'birthDate',
    ]

    limit_per_page: 25

    search_fields = [
        'username',
        'first_name',
        'last_name',
        'email',
    ]
