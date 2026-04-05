from django.urls import path

from . import views

urlpatterns = [
   path("", views.list_places, name="places"),
   path("<slug:slug>/", views.detail_place, name="place"),
]
