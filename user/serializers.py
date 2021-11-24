from rest_framework import serializers
from user.models import User

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password")
    
    def create(self, validated_data):
        username = validated_data["username"]
        if User.objects.filter(username=validated_data["username"]).exists():
            raise serializers.ValidationError(f"Username {username} is already in use")
        email = validated_data["email"]
        if User.objects.filter(email=validated_data["email"]).exists():
            raise serializers.ValidationError(f"Email {email} is already in use")
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        