# Generated by Django 4.2.3 on 2023-08-02 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_product_productdescription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ManyToManyField(blank=True, null=True, to='products.category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='plateform',
            field=models.CharField(blank=True, max_length=35, null=True),
        ),
    ]
