from turtle import title
from django.utils import timezone
from django.db import models

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100, default="No title provided")
    text = models.CharField(max_length=300)
    pub_date = models.DateTimeField(default=timezone.now)
