from django.db import models


class Product(models.Model):
    productId = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()
    price = models.FloatField()
    plateform = models.CharField()
    productDescription = models.TextField()
    createdDate = models.DateField()
    # Ajouter un champ pour les users quand la partie user sera opé


class Category(models.Model):
    title = models.CharField()
