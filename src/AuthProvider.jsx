import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const addToken = (token) => {
    setToken(token);
  };

  const removeToken = (token) => {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, addToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
