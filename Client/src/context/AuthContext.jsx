// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem('token'));
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(false); // ✅ Marks loading complete
//   }, []);

//   const login = (newToken) => {
//     if (newToken) {
//       localStorage.setItem('token', newToken);
//       setToken(newToken);
//     } else {
//       logout();
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//   };

//   const isLoggedIn = !!token;

//   return (
//     <AuthContext.Provider value={{ token, isLoggedIn, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // ✅ Marks loading complete
  }, []);

  const login = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isLoggedIn = !!token;

  // Creating the authAxios instance with the token
  const authAxios = axios.create({
    baseURL: 'http://localhost:5001/api', // Update with your backend URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, isLoading, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};
