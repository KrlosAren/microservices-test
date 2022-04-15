
import django.dispatch
from django.db import models
from django.urls import reverse

update_available = django.dispatch.Signal(providing_args=['instance', 'created', 'updated'])

class Menu(models.Model):
    """
    Menu model.
    """
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='menu_images', blank=True)
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('menu:detail', kwargs={'name': self.name})
    
    def change_available(self):
        self.available = not self.available
        self.save()

        update_available.send(sender=self.__class__,instance=self,available=self.available,created=False,updated=True)
        return
