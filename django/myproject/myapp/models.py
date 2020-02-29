# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class User(models.Model):
    username = models.CharField(unique=True, max_length=12)
    password = models.CharField(max_length=100)
    picture = models.TextField()
    role = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'user'



class Theme(models.Model):
    title = models.CharField(max_length=13)
    content = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.TextField()
    picture = models.TextField()
    date = models.DateField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'theme'


class Comment(models.Model):
    content = models.CharField(max_length=250)
    theme = models.ForeignKey(Theme,on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.TextField()
    picture = models.TextField()
    date = models.DateField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    edited = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'comment'
