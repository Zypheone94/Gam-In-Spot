from django.contrib.auth.models import BaseUserManager
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, firstName, lastName, birthDate, email, **extra_fields):
        user = self.model(
            firstName=firstName,
            lastName=lastName,
            birthDate=birthDate,
            email=email,
            **extra_fields
        )
        user.set_password(extra_fields.get('password'))
        user.save(using=self._db)
        return user

    def create_superuser(self, firstName, lastName, birthDate, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(firstName, lastName, birthDate, **extra_fields)