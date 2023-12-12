
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('backdoors/', admin.site.urls),
    path('products/', include('products.urls')),
    path('users/', include('users.urls')),
    path('cart/', include('cart.urls'))
]
