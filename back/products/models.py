from django.db import models
from users.models import User


class Category(models.Model):
    categoryId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()


class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()
    price = models.FloatField()
    plateform = models.CharField(max_length=35)
    productDescription = models.TextField()
    createdDate = models.DateField()
    category = models.ManyToManyField(Category)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
