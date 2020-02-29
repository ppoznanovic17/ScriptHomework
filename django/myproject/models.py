# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Comment(models.Model):
    content = models.CharField(max_length=150)
    user = models.ForeignKey('User', models.DO_NOTHING)
    username = models.ForeignKey('User', models.DO_NOTHING, db_column='username')
    picture = models.TextField()
    theme = models.ForeignKey('Theme', models.DO_NOTHING)
    date = models.DateField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    edited = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'comment'


class Hello(models.Model):
    content = models.CharField(max_length=34, blank=True, null=True)
    title = models.CharField(max_length=13, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hello'


class Theme(models.Model):
    title = models.CharField(unique=True, max_length=14)
    content = models.CharField(max_length=200)
    user = models.ForeignKey('User', models.DO_NOTHING)
    username = models.ForeignKey('User', models.DO_NOTHING, db_column='username')
    picture = models.TextField()
    date = models.DateField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'theme'


class User(models.Model):
    username = models.CharField(unique=True, max_length=12)
    password = models.CharField(max_length=100)
    picture = models.TextField()
    role = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'user'
