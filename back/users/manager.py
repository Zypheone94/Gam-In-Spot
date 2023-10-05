from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, birthDate, firstName, lastName, **extra_fields):
        now = timezone.now()
        if not username:
            raise ValueError('Username must be set')
        hashed_password = make_password(password)
        user = self.model(username=username, email=email, password=hashed_password,
                          first_name=firstName, last_name=lastName,
                          birthDate=birthDate, is_staff=False, is_superuser=False,
                            creationAccountDate=now)
        user.save(using=self._db)
        return user

    def create_superuser(self, birthDate, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(birthDate, **extra_fields)