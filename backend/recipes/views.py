from recipes.models import Recipe, Category, Ingredient
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from recipes.serializers import RecipeListSerializer, RecipeDetailSerializer, CategoryListSerializer, IngredientSerializer
from rest_framework import pagination

class LoadMorePagination(pagination.CursorPagination):
    page_size = 1

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeListSerializer
    pagination_class = LoadMorePagination

    def get_queryset(self):
        queryset = Recipe.objects.all()
        recipe_title = self.request.query_params.get('title', None)
        recipe_categories = self.request.query_params.get('categories[]', [category.id for category in Category.objects.all()])
        print(self.request.query_params)
        if recipe_title:
            print(recipe_title)
            queryset = queryset.filter(title=recipe_title)
        queryset = queryset.filter(category__in=recipe_categories)
        return queryset

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