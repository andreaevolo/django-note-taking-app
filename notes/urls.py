from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('note/<int:note_id>', views.delete_note, name='delete'),
    path('create', views.create_note, name='create')
]
