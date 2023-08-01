from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    userId = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=35)
    lastName = models.CharField(max_length=35)
    birthDate = models.DateField()
    creationAccountDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.firstName