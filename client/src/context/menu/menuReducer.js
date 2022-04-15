import { fetchSinToken } from '../../helpers/fetch';
import { types } from '../../types/types';

export const menuReducer = (state, action) => {
  switch (action.type) {
    case types.allMenu:
      return {
        ...state,
        menus: [...action.payload],
        loading: false,
      };

    case types.newMenu:
      return {
        ...state,
        menus: [action.payload, ...state.menus],
      };

    case types.noMenus:
      return {
        ...state,
        menus: [],
        loading: false,
      };

    case types.updateMenu:
      const menus = state.menus.map((menu) => {
        if (menu.id === action.payload.id) {
          return action.payload;
        } else {
          return menu;
        }
      });
      return {
        ...state,
        menus: [...menus],
        loading: false,
      };

    case types.deleteMenu:
      const activeMenus = state.menus.filter(
        (menu) => menu.id !== action.payload.id
      );
      return {
        ...state,
        menus: [...activeMenus],
        loading: false,
      };

    default:
      return state;
  }
};

export const getMenus = async () => {
  const resp = await fetchSinToken('http://api.django.localhost/api', 'menu/');
  return resp;
};

export const postMenus = async (menu) => {
  const resp = await fetchSinToken(
    'http://api.django.localhost/api',
    'menu/',
    menu,
    'post'
  );

  return resp;
};
export const updateMenu = async (menuId) => {
  const resp = await fetchSinToken(
    'http://api.django.localhost/api',
    `menu/${menuId}/change_availability/`,
    {},
    'put'
  );

  return resp;
};

export const deleteMenu = async (menuId) => {
  const resp = await fetchSinToken(
    'http://api.django.localhost/api',
    `menu/${menuId}/`,
    {},
    'delete'
  );

  return resp;
};

export const getMenusFromNode = async () => {
  const resp = await fetchSinToken('http://api.node.localhost/api', 'menu/');
  return resp;
};
