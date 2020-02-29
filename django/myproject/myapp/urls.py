from django.urls import path
from . import views


urlpatterns = [
    path('u/', views.users, name='users'),
    path('t/', views.themes, name='themes'),
    path('c/', views.comments, name='comments'),
    path('', views.index, name='index'),
    path('delete/<int:id>/', views.deleteUser, name='deleteUser'),
    path('edit/<int:id>/', views.editTheme, name='editTheme'),
]