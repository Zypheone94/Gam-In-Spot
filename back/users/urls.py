from django.urls import path
from .views import LoginView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'users'

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('token/refresh', TokenRefreshView.as_view(), name='login_refresh')
    # Autres URL de l'application...
]
