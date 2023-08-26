from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=35)
    last_name = models.CharField(max_length=35)
    birthDate = models.DateField()
    creationAccountDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()


