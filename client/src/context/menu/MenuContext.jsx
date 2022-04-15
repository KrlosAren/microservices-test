import React, { createContext, useReducer } from 'react';
import { menuReducer } from './menuReducer';

export const MenuContext = createContext();

const initialState = {
  loading: true,
  uid: '',
  nombre: null, // UID del usuario al que yo quiero enviar mensajes
  email: null, // Todos los usuarios de la base datos
  menus: [], // El chat seleccionado
};

export const MenuProvider = ({ children }) => {
  const [menuState, dispatch] = useReducer(menuReducer, initialState);

  return (
    <MenuContext.Provider
      value={{
        menuState,
        dispatch,
      }}>
      {children}
    </MenuContext.Provider>
  );
};
