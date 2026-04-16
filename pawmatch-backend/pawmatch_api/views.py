from django.contrib.auth.models import User
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Animal, Swipe, Match, Pet, HealthRecord, Reminder
from .serializers import (
    RegisterSerializer, UserSerializer,
    AnimalSerializer, SwipeSerializer, MatchSerializer,
    PetSerializer, HealthRecordSerializer, ReminderSerializer,
)


# ── Auth ──────────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    """Регистрация → возвращает access + refresh токены."""
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def me_view(request):
    """Данные текущего пользователя."""
    return Response(UserSerializer(request.user).data)


# ── Animals (список всех) ─────────────────────────────────────────────────────

class AnimalListView(generics.ListAPIView):
    """
    GET /api/animals/ — список всех животных для фронтенда
    """
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


# ── Swipe ─────────────────────────────────────────────────────────────────────

@api_view(['GET'])
def swipe_cards(request):
    """Вернуть животных, которых пользователь ещё не свайпал."""
    already_swiped = Swipe.objects.filter(user=request.user).values_list('animal_id', flat=True)
    animals = Animal.objects.filter(is_adopted=False).exclude(id__in=already_swiped)
    serializer = AnimalSerializer(animals, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
def swipe_view(request):
    """
    Тело: { "animal_id": 1, "is_like": true }
    Ответ: { "status": "swiped" } или { "status": "matched", "match": {...} }
    """
    animal_id = request.data.get('animal_id')
    is_like = request.data.get('is_like', False)

    try:
        animal = Animal.objects.get(id=animal_id)
    except Animal.DoesNotExist:
        return Response({'error': 'Животное не найдено'}, status=404)

    swipe, created = Swipe.objects.get_or_create(
        user=request.user, animal=animal,
        defaults={'is_like': is_like}
    )
    if not created:
        swipe.is_like = is_like
        swipe.save()

    if is_like:
        match, _ = Match.objects.get_or_create(user=request.user, animal=animal)
        match_data = MatchSerializer(match, context={'request': request}).data
        return Response({'status': 'matched', 'match': match_data})

    return Response({'status': 'swiped'})


# ── Matches ───────────────────────────────────────────────────────────────────

class MatchListView(generics.ListAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Match.objects.filter(user=self.request.user).select_related('animal')


# ── Pets ──────────────────────────────────────────────────────────────────────

class PetListCreateView(generics.ListCreateAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        return Pet.objects.filter(user=self.request.user).select_related('animal')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        return Pet.objects.filter(user=self.request.user)


# ── Health Records ────────────────────────────────────────────────────────────

class HealthRecordListCreateView(generics.ListCreateAPIView):
    serializer_class = HealthRecordSerializer

    def get_queryset(self):
        pet_id = self.request.query_params.get('pet_id')
        qs = HealthRecord.objects.filter(pet__user=self.request.user)
        if pet_id:
            qs = qs.filter(pet_id=pet_id)
        return qs


class HealthRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HealthRecordSerializer

    def get_queryset(self):
        return HealthRecord.objects.filter(pet__user=self.request.user)


# ── Reminders ─────────────────────────────────────────────────────────────────

class ReminderListCreateView(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer

    def get_queryset(self):
        pet_id = self.request.query_params.get('pet_id')
        qs = Reminder.objects.filter(pet__user=self.request.user)
        if pet_id:
            qs = qs.filter(pet_id=pet_id)
        return qs


class ReminderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer

    def get_queryset(self):
        return Reminder.objects.filter(pet__user=self.request.user)