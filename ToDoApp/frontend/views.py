from django.shortcuts import render

# Local Import


# Create your views here.


def Home(request):
    return render(request, 'frontend/list.html')
