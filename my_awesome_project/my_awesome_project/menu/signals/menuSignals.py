import json

import redis
import requests
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from my_awesome_project.menu.models import Menu
from my_awesome_project.menu.serializers import MenuSerializer

re = redis.Redis(host='redis',port=6379,db=0)

@receiver(post_save, sender=Menu)
def hear_signal(sender , instance , **kwargs):
    if kwargs.get('created'):
      print('se creo un nuevo menu')

      serializer = MenuSerializer(instance)
      # import pdb;pdb.set_trace()
              
      re.publish('menu', json.dumps(serializer.data))
      try:
          requests.post('http://node:4500/api/', data=serializer.data)
          print('se pudo contactar con node')
      except requests.exceptions.ConnectionError as e:
          print(e)
          print('no se pudo conectar con el node')

    return

@receiver(post_save, sender=Menu)
def update_available(sender,*args,**kwargs):
    if not kwargs.get('created'):
        print('se cambio el estado del menu')
        instance = kwargs.get('instance')
        menu = MenuSerializer(instance).data
        re.publish('update_menu', json.dumps(menu))
        try:
            requests.post('http://node:4500/api/', data=menu)
            print('se cambio el estado del menu y se guardo en node')
        except requests.exceptions.ConnectionError as e:
            print(e)
            print('se cambio el estado del menu y no se puedo guardar en node')
    return

@receiver(post_delete, sender=Menu)
def delete_on_node(sender, instance, **kwargs):
    print('se borro un  menu')

    serializer = MenuSerializer(instance)
    re.publish('delete_menu', json.dumps(serializer.data))
    try:
        requests.post('http://node:4500/api/', data=serializer.data)
        print('se pudo contactar con node y borrar el menu')
    except requests.exceptions.ConnectionError as e:
        print(e)
        print('no se pudo conectar con el node y no borrar el menu')
    return

