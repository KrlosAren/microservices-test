from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from my_awesome_project.menu.views import MenuViewSet
from my_awesome_project.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("menu", MenuViewSet)


app_name = "api"
urlpatterns = router.urls
