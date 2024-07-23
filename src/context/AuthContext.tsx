import React, { createContext, ReactNode, useEffect, useState } from "react";
import { login } from "../services/authService";

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
    const getTokenFromLogin = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        if (user) {
          const loginWhenF5 = await login(user.email, user.password);
          const { access } = loginWhenF5.data;
          if (loginWhenF5?.status === 200) {
            localStorage.setItem(
              "token",
              JSON.stringify({
                access: loginWhenF5.data.access,
                refresh: loginWhenF5.data.refresh,
              })
            );
            setToken(access);
            console.log("vào đây");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTokenFromLogin();
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
