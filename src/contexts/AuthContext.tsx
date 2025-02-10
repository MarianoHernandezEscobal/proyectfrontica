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
  const [user, setUser] = useState<UserData | null>(null);
  const [hasSession, setHasSession] = useState<boolean | null>(null); // Cambiado a null para evitar falsos negativos en la primera renderización

  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      setHasSession(true);
      setUser(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.warn("Error fetching user profile:", error);
      sessionStorage.removeItem("userData");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("userData");
    setUser(null);
    setHasSession(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const cookieExists = await hasCookie("sessionIndicator");
      setHasSession(cookieExists);

      if (cookieExists) {
        const storedUser = sessionStorage.getItem("userData");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          await fetchUserProfile();
        }
      } else {
        sessionStorage.removeItem("userData");
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
