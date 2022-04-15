from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MenusConfig(AppConfig):
    name = "my_awesome_project.menu"
    verbose_name = _("Menu")

    def ready(self):
        try:
            import my_awesome_project.menu.signals  # noqa F401
        except ImportError:
            pass
