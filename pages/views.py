from django.shortcuts import render
from .models import slide


def pages (request):
    slides = slide.objects.all()
    return render(request , "pages/index.html", {"slides": slides})


def explore(request):
    from places.views import list_places

    return list_places(request)


def aboutus(request):
    return render(request,"pages/about.html")

