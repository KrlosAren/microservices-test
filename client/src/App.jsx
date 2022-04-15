import './App.css';
import { AuthProvider } from './context/auth/AuthContext';
import { MenuProvider } from './context/menu/MenuContext';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';

function MenuApp() {
  return (
    <MenuProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </MenuProvider>
  );
}

export default MenuApp;
