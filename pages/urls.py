from django.urls import path 
from . import views

urlpatterns = [
    path("" , views.pages , name= "pages"),
    path("explore/",views.explore,name= "explore"),
    path("aboutus/",views.aboutus,name= "about"),
]