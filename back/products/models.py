import datetime

from django.db import models
from django.utils.text import slugify
from users.models import CustomUser


class Category(models.Model):
    categoryId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=35, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

    def generate_slug(self):
        slug = slugify(self.title)
        self.slug = slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.generate_slug()

        super().save(*args, **kwargs)


class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=35)
    slug = models.SlugField()
    price = models.FloatField()
    plateform = models.CharField(max_length=35, null=True, blank=True)
    productDescription = models.TextField(null=True, blank=True)
    createdDate = models.DateField()
    category = models.ManyToManyField(Category)
    seller_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    edition = models.CharField(max_length=50, default="Normal")

    def __str__(self):
        return self.title
