from django.db import models

# Create your models here.

class slide(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="photos/%y/%m/%d")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
