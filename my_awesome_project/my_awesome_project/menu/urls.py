from importlib.resources import path
from xml.etree.ElementInclude import include

from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from my_awesome_project.menu.views.MenuView import MenuViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("menu", MenuViewSet)


app_name = "menu"
urlpatterns = [
]
urlpatterns += router.urls
