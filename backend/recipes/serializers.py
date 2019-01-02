from rest_framework import serializers
from recipes.models import Recipe, Category, Ingredient
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class CategoryDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', )


class CategoryListSerializer(serializers.ModelSerializer):
    # recipes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name')


class IngredientListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name')


class RecipeListSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    # category = CategoryListSerializer()
    # ingredients = serializers.StringRelatedField(many=True)
    ingredients = IngredientListSerializer(many=True)
    
    class Meta:
        model = Recipe
        fields = '__all__'


class RecipeDetailSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    ingredients_write = serializers.ListField(
        child=serializers.CharField(write_only=True),
        write_only=True,
        required=False,
        default=[]
    )

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients_write')
        recipe = Recipe.objects.create(**validated_data)
        recipe.save()
        recipe_id = recipe.id
        for name in ingredients:

            serializer_data = IngredientSerializer()

            data = {'name': name, 'recipe': recipe_id}
            serializer = IngredientSerializer(data=data)
            serializer.is_valid()
            vdata = serializer.validated_data


            ingredient = Ingredient.objects.create(**vdata)
            ingredient.save()
        return recipe

    def update(self, instance, validated_data):

        instance_serializer = RecipeDetailSerializer(instance)

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.category = validated_data.get('category', instance.category)

        ingredients = validated_data.get('ingredients_write', [])

        for name in ingredients:

            data = {'name': name, 'recipe': instance.id}
            serializer = IngredientSerializer(data=data)
            if serializer.is_valid():
                vdata = serializer.validated_data
                print(vdata)
                ingredient, created = Ingredient.objects.get_or_create(**vdata)
                if created:
                    ingredient.save()

        instance.save()
        return instance

    class Meta:
        model = Recipe
        fields = '__all__'


class IngredientSerializer(serializers.ModelSerializer):
    recipe = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())

    def validate_name(self, value):
        print("PLEASE WORK")
        print(value)
        if value == '':
            print("raise error")
            raise serializers.ValidationError("Can't add empty string")
        return value

        
    class Meta:
        model = Ingredient
        fields = '__all__'