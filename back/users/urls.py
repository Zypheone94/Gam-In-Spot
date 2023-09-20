from django.urls import path
from .views import LoginView, LogoutView, UpdateUserView, UserDetailView, SendValidationMail, PasswordChangeView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'users'

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('detail', UserDetailView.as_view(), name='user_detail'),
    path('modify', UpdateUserView.as_view(), name='modify_user'),
    path('validation', SendValidationMail.as_view(), name='validation_mail'),
    path('password', PasswordChangeView.as_view(), name='password'),
    path('token/refresh', TokenRefreshView.as_view(), name='login_refresh')
]
