import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  console.log("token", token);

  useEffect(() => {
    const getTokenFromLocalStorge = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;
        if (token) {
          setToken(token.access);
          console.log("vào đây");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTokenFromLocalStorge();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, handleLogout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
