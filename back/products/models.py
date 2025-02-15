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
        """
        Fonction pour générer automatiquement le slug à partir du champ 'seller' et du 'title'.
        """
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
    category = models.ManyToManyField(Category, null=True, blank=True)
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def generate_slug(self):
        """
        Fonction pour générer automatiquement le slug à partir du champ 'seller' et du 'title'.
        """
        slug = slugify(self.seller.username + '-' + self.title)
        self.slug = slug

    def generate_date(self):
        date = datetime.date.today()
        self.createdDate = date

    def save(self, *args, **kwargs):
        """
        Redéfinition de la méthode save pour générer automatiquement le slug et la date avant l'enregistrement.
        """
        if not self.slug:
            self.generate_slug()

        if not self.createdDate:
            self.generate_date()

        super().save(*args, **kwargs)

