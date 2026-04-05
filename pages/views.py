from django.shortcuts import render
from .models import slide


def pages (request):
    slides = slide.objects.all()
    return render(request , "pages/index.html", {"slides": slides})


def aboutus(request):
    return render(request,"pages/about.html")

