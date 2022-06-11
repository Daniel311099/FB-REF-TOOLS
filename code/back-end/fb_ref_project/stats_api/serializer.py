from rest_framework import serializers

from .models import Frame, Player, Record, UserFrame
from users.models import User

class StatTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['record_id', 'player', 'frame', 'games_starts', 'minutes', 'goals', 'assists', 'xg', 'xa']

