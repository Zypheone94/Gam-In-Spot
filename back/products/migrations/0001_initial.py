# Generated by Django 4.2.3 on 2023-07-29 07:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('categoryId', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=35)),
                ('slug', models.SlugField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('productId', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=35)),
                ('slug', models.SlugField()),
                ('price', models.FloatField()),
                ('plateform', models.CharField(max_length=35)),
                ('productDescription', models.TextField()),
                ('createdDate', models.DateField()),
                ('category', models.ManyToManyField(to='products.category')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]
