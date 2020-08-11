# Django Imports


from rest_framework import serializers

# Local Imports
from Tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
