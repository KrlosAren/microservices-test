

from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from my_awesome_project.menu.models import Menu
from my_awesome_project.menu.serializers import MenuSerializer

User = get_user_model()


class MenuViewSet(mixins.CreateModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       mixins.DestroyModelMixin,
                       viewsets.GenericViewSet):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all().order_by('-created')
    # print(queryset.query)

    permission_classes =[]

    def list(self, request, *args, **kwargs):
      response = super(MenuViewSet,self).list(request, *args, **kwargs)

      # print(response.data)
      if response.data == []:
        data = {
          "message": "All menus active",
          "data": [],
          "has_menu": False
        }
        response.data = data

        return response

      menus = Menu.objects.all().order_by('-created')
      data = {
        "message": "All menus active",
        "data": MenuSerializer(menus,many=True).data,
        "has_menu": True
      }
      response.data = data
      return response
    
    def delete(self, request, *args, **kwargs):
      response = super(MenuViewSet,self).delete(request, *args, **kwargs)
      data = {
        "message": "Menu deleted",
        "data": {},
        "has_menu": True
      }
      response.data = data
      return response

    @action(detail=True, methods=['put'])
    def change_availability(self, request, pk=None):
      menu = self.get_object()
      menu.change_available()

      data = {
        'message': 'Menu availability changed',
        'data': MenuSerializer(menu).data
      }
      return Response(data)
