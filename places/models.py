from django.db import models
from django.utils.text import slugify


class Place(models.Model):
    name = models.CharField(max_length=120,verbose_name="Name")
    slug = models.SlugField(unique=True,blank=True,null=True)
    description = models.TextField(verbose_name="Description", db_column="discrption")
    active = models.BooleanField(default=True,verbose_name="Availability")
    created_at = models.DateTimeField(auto_now_add=True,verbose_name="Original date")
    updated_at = models.DateTimeField(auto_now=True,verbose_name="Last date")

    def __str__(self):
        return self.name

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)

class PlaceImage(models.Model):
    place = models.ForeignKey(Place,related_name="images",on_delete=models.CASCADE,verbose_name="Place")
    image = models.ImageField(upload_to="photos/%y/%m/%d",verbose_name="Image")
    created_at = models.DateTimeField(auto_now_add=True,verbose_name="Original date")
    updated_at = models.DateTimeField(auto_now=True,verbose_name="Last date")


    def __str__(self):
        return self.place.name

class BookableService(Place):
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    stars = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    

    
