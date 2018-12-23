from rest_framework import serializers
from recipes.models import Recipe, Category, Ingredient

class CategoryDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', )


class CategoryListSerializer(serializers.ModelSerializer):
    recipes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Category
        fields = ('id', 'created', 'name', 'recipes')


class RecipeListSerializer(serializers.ModelSerializer):
    category = CategoryDetailSerializer()
    ingredients = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Recipe
        fields = '__all__'


class RecipeDetailSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # ingredients = serializers.StringRelatedField(read_only=True)

    ingredients_write = serializers.ListField(
        child=serializers.CharField(write_only=True),
        write_only=True,
        required=False,
        default=[]
    )

    def create(self, validated_data):
        print(validated_data)
        ingredients = validated_data.pop('ingredients_write')
        print(ingredients)
        print(validated_data)
        recipe = Recipe.objects.create(**validated_data)
        recipe.save()
        recipe_id = recipe.id
        print(recipe_id)
        for name in ingredients:

            serializer_data = IngredientSerializer()
            print(serializer_data.data)

            data = {'name': name, 'recipe': recipe_id}
            serializer = IngredientSerializer(data=data)
            serializer.is_valid()
            # True
            vdata = serializer.validated_data
            print(vdata)


            ingredient = Ingredient.objects.create(**vdata)
            print(ingredient)
            ingredient.save()
            print(ingredient)
        return recipe

    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.created = validated_data.get('created', instance.created)
    #     instance.save()
    #     return instance

    class Meta:
        model = Recipe
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    recipe = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    class Meta:
        model = Ingredient
        fields = '__all__'