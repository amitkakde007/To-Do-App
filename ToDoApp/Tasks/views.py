# Django Imports
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

# Local Imports
from Tasks.models import Task
from Tasks.serializers import TaskSerializer
# Create your views here.


@api_view(('GET',))
def TaskListView(request, *args, **kwargs):
    queryset = Task.objects.all()
    serializer = TaskSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(('GET',))
def TaskDetailView(request, pk):
    queryset = Task.objects.get(id=pk)
    serializer = TaskSerializer(queryset, many=False)
    return Response(serializer.data)


@api_view(('POST',))
def TaskCreateView(request, *args):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid(): serializer.save()
    return Response(serializer.data)


@api_view(('PUT',))
def TaskUpdateView(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():serializer.save()
    return Response(serializer.data)


@api_view(('DELETE',))
def TaskDeleteView(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Task was deleted")
