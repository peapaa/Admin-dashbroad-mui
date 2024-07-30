import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getTokenFromLocalStorge = () => {
      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;
        if (token) {
          setToken(token.access);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTokenFromLocalStorge();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ token, handleLogout, setToken, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
