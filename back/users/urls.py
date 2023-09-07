from django.urls import path
from .views import LoginView, LogoutView, UpdateUserView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'users'

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('modify', UpdateUserView.as_view(), name='modify_user'),
    path('token/refresh', TokenRefreshView.as_view(), name='login_refresh')
]
