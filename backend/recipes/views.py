from recipes.models import Recipe, Category, Ingredient
from rest_framework import generics, viewsets, permissions
from django.shortcuts import get_object_or_404
from recipes.serializers import (RecipeListSerializer, RecipeDetailSerializer,
CategoryListSerializer, IngredientSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer)
from rest_framework import pagination
from rest_framework.response import Response

from knox.models import AuthToken
# from knox.views import LogoutView


class GetUser(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LoginUser(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })



class CreateUser(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoadMorePagination(pagination.CursorPagination):
    page_size = 10


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in ['GET',]


class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated|ReadOnly, )
    queryset = Recipe.objects.all()
    serializer_class = RecipeListSerializer
    pagination_class = LoadMorePagination

    def get_queryset(self):
        queryset = Recipe.objects.all()
        recipe_title = self.request.query_params.get('title', None)
        recipe_categories = self.request.GET.getlist('categories[]', [category.id for category in Category.objects.all()])
        if recipe_title:
            queryset = queryset.filter(title=recipe_title)
        queryset = queryset.filter(category__in=recipe_categories)
        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'remove', 'partial_update']:
            return RecipeDetailSerializer
        return RecipeListSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer