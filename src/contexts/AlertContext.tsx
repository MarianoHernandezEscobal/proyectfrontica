import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert, { AlertType } from "../components/atomos/Alerts";

interface AlertContextProps {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlert, setCurrentAlert] = useState<{ type: AlertType; message: string } | null>(null);

  const showAlert = (type: AlertType, message: string) => {
    setCurrentAlert({ type, message });

    setTimeout(() => {
      setCurrentAlert(null);
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {currentAlert && <Alert type={currentAlert.type} message={currentAlert.message} />}
      </div>
    </AlertContext.Provider>
  );
};
/* eslint-disable react-refresh/only-export-components */
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
