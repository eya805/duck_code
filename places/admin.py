from django.contrib import admin
from .models import Place , PlaceImage , BookableService 


class PlaceImageInline(admin.TabularInline):
    model = PlaceImage
    extra = 3 

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ("name","active","created_at","updated_at")
    prepopulated_fields = {"slug":("name",)}
    list_filter = ("active","created_at","updated_at")
    inlines = [PlaceImageInline]
    
@admin.register(BookableService)
class BookableServiceAdmin(admin.ModelAdmin):
    list_display = ("name","price","rating","stars","active","created_at","updated_at")
    prepopulated_fields = {"slug":("name",)}
    list_filter = ("active","created_at","updated_at")
    inlines = [PlaceImageInline]
    