from rest_framework import serializers

from .models import CustomColumn

class StandardColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomColumn
        fields = '__all__'