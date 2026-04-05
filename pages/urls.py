from django.urls import path 
from . import views
from places.views import list_places

urlpatterns = [
    path("" , views.pages , name= "pages"),
    path("explore/",list_places,name= "explore"),
    path("aboutus/",views.aboutus,name= "about"),
]