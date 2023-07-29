from django.db import models


class Category(models.Model):
    categoryId = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()


class Product(models.Model):
    productId = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()
    price = models.FloatField()
    plateform = models.CharField(max_length=35)
    productDescription = models.TextField()
    createdDate = models.DateField()
    category = models.ManyToManyField(Category)
    # Ajouter un champ pour les users quand la partie user sera opé
