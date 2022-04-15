import React, { createContext, useCallback, useState } from 'react';

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: true,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => true;

  const verificaToken = useCallback(async () => {
    setAuth({
      uid: 1,
      checking: false,
      logged: true,
      name: 'carlos',
      email: 'carlos@mail.com',
    });

    return true;
  }, []);

  const logout = () => {
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        verificaToken,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
