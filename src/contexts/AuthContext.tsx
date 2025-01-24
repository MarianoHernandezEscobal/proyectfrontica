import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, logoutUser } from "../services/users/userService";
import { UserData } from "../utils/types";

interface AuthContextProps {
  user: UserData | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.warn("No se encontró un usuario activo o ocurrió un error:", error);
      sessionStorage.removeItem("userData");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("userData");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserProfile();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logoutUser: handleLogout,
        fetchUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
