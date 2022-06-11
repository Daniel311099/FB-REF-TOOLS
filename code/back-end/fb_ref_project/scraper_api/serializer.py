from rest_framework import serializers

from new_view import AddFrame
from stats_api.models import Record

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"