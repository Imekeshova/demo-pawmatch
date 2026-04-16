from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Animal, Shelter, Swipe, Match, Pet, HealthRecord, Reminder


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'


class AnimalSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Animal
        fields = [
            'id', 'shelter', 'name', 'species', 'breed', 'age',
            'photo', 'is_vaccinated', 'is_neutered', 'is_adopted', 'likes_count',
        ]

    def get_likes_count(self, obj):
        return obj.likes_count()

    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return obj.photo_url or ''


class SwipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swipe
        fields = ['id', 'animal', 'is_like', 'created_at']


class MatchSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'animal', 'created_at']


class PetSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(), source='animal', write_only=True
    )

    class Meta:
        model = Pet
        fields = ['id', 'animal', 'animal_id', 'name', 'birth_date', 'weight']


class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = ['id', 'pet', 'record_type', 'title', 'description', 'date', 'next_due_date']


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'pet', 'title', 'date_time', 'is_completed']