# Generated by Django 3.0.3 on 2020-02-22 04:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20200222_0512'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='comment',
            table='comment',
        ),
        migrations.AlterModelTable(
            name='theme',
            table='theme',
        ),
    ]