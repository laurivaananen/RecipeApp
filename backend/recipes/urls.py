from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from recipes import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('recipes', views.RecipeViewSet)
router.register('categories', views.CategoryViewSet)
router.register('ingredients', views.IngredientViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.CreateUser.as_view()),
    path('login/', views.LoginUser.as_view()),
    path('user/', views.GetUser.as_view()),
    # path('recipes/', views.RecipeList.as_view()),
    # path('recipes/<int:pk>/', views.RecipeDetail.as_view()),
    # path('categories/', views.CategoryList.as_view()),
    # path('categories/<int:pk>/', views.CategoryDetail.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)