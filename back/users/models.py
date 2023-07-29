from django.db import models

class User(models.Model):
    userId = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=35)
    lastName = models.CharField(max_length=35)
    birthDate = models.DateField()
    creationAccountDate = models.DateField()