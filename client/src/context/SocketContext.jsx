import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';
import { AuthContext } from './auth/AuthContext';
import { MenuContext } from './menu/MenuContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    'http://api.node.localhost'
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(MenuContext);

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  // Escuchar cuando se cera un nuevo menu
  useEffect(() => {
    socket?.on('all-menus', (menu) => {
      console.log('socket menu', menu);
      dispatch({
        type: types.newMenu,
        payload: JSON.parse(menu),
      });
    });
  }, [socket, dispatch]);

  // Escuchar los cambios en el menu
  useEffect(() => {
    socket?.on('update-menu', (menu) => {
      dispatch({
        type: types.updateMenu,
        payload: JSON.parse(menu),
      });
    });
  }, [socket, dispatch]);

  // Escuchar los cambios en el menu
  useEffect(() => {
    socket?.on('delete-menu', (menu) => {
      dispatch({
        type: types.deleteMenu,
        payload: JSON.parse(menu),
      });
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
