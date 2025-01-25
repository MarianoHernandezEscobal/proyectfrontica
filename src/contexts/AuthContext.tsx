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
  const [hasSession, setHasSession] = useState(false); 

  const fetchUserProfile = async () => {
    try {
      // Attempt to get user data from your service
      const userData = await getUsers();
      // Store in sessionStorage for quick access
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.warn("No active user or an error occurred:", error);
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
    const cookieExists = hasCookie("sessionIndicator");
    setHasSession(cookieExists);
    console.log('cookie auth', hasCookie("sessionIndicator"));

    const storedUser = sessionStorage.getItem("userData");
    console.log('user', storedUser);

    if (cookieExists) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        fetchUserProfile();
      }
    } else {
      sessionStorage.removeItem("userData");
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasSession && !!user,
        logoutUser: handleLogout,
        fetchUserProfile,
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
