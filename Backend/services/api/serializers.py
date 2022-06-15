from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from services import models
from dynamic_rest import serializers


class RegisterSerializer(serializers.DynamicModelSerializer):
    email = serializers.fields.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )

    password = serializers.fields.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    confirm = serializers.fields.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "confirm",
            "email",
            "first_name",
            "last_name",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


class CountrySerializer(serializers.DynamicModelSerializer):
    class Meta:
        model = models.Country
        fields = "__all__"


class CitySerializer(serializers.DynamicModelSerializer):
    class Meta:
        model = models.City
        fields = "__all__"


class PostSerializer(serializers.DynamicModelSerializer):
    class Meta:
        model = models.Post
        fields = "__all__"


class UserPostSerializer(serializers.DynamicModelSerializer):
    PostID = serializers.DynamicRelationField("PostSerializer", embed=True)
    UserID = serializers.DynamicRelationField("RegisterSerializer", embed=True)

    class Meta:
        model = models.UserPost
        fields = "__all__"


class ApplicationLoginActivitySerializer(serializers.DynamicModelSerializer):
    UserID = serializers.DynamicRelationField("RegisterSerializer", embed=True)
    CityID = serializers.DynamicRelationField("CitySerializer", embed=True)

    class Meta:
        model = models.ApplicationLoginActivity
        fields = "__all__"
        name = "Application_Login_Activities"


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["user"] = RegisterSerializer(user).data
        return token
