import { useState, useEffect } from "react";

import { UserData } from "../utils/types";
import { all, makeAdmin } from "../services/users/userService";
import UserCard from "../components/atomos/UserCard";
import { useAlert } from "../contexts/AlertContext";

export const MakeAdmin = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    const loadUsers = async () => {
      if (!users.length) {
        setUsers(await all());
      }
    };

    loadUsers();
  }, []);

  const handleToggleAdmin = async (email: string, isAdmin: boolean): Promise<boolean> => {
    try {
        await makeAdmin(email, isAdmin);
        showAlert('success', `Usuario ${email} ahora es ${isAdmin ? 'administrador' : 'usuario normal'}`);
        return true;
   } catch (error) {
        let errorMessage = "Error al cambiar el rol del usuario";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        showAlert('error',errorMessage);
        return false;

    }
  };

  return (
    <div className="mt-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Gestión de Usuarios</h1>

    <div className="container mx-auto justify-center px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
      {users.map((user) => (
        <UserCard key={user.email} user={user} onToggleAdmin={handleToggleAdmin} />
      ))}
    </div>
  </div>
  </div>
  );
};
