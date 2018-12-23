from recipes.models import Recipe, Category, Ingredient
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from recipes.serializers import RecipeListSerializer, RecipeDetailSerializer, CategoryListSerializer, IngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeListSerializer

    def get_serializer_class(self):
        print(self.action)
        if self.action in ['create', 'update', 'remove', 'partial_update']:
            return RecipeDetailSerializer
        return RecipeListSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer