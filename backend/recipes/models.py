from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    description = models.TextField(blank=True, default='')
    category = models.ForeignKey('Category', related_name='recipes', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name='recipes', on_delete=models.CASCADE, null=True, default=None)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-created', )


class Category(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-created', )


class Ingredient(models.Model):
    name = models.CharField(max_length=128)
    recipe = models.ForeignKey('Recipe', related_name='ingredients', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )

