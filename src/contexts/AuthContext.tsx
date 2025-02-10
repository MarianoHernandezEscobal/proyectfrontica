import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, logoutUser } from "../services/users/userService";
import { UserData } from "../utils/types";
import { hasCookie } from "../utils/cookie";

interface AuthContextProps {
  user: UserData | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(
    () => JSON.parse(localStorage.getItem("userData") || "null") // Carga el usuario desde localStorage
  );
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      setHasSession(true);
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData)); // Guardar en localStorage
    } catch (error) {
      console.warn("Error fetching user profile:", error);
      localStorage.removeItem("userData");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("userData"); // Eliminar usuario de localStorage
    setUser(null);
    setHasSession(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const cookieExists = await hasCookie("sessionIndicator");
      setHasSession(cookieExists);

      if (cookieExists) {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          await fetchUserProfile();
        }
      } else {
        localStorage.removeItem("userData");
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasSession === true && !!user,
        logoutUser: handleLogout,
        fetchUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
