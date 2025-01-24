import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa6";
import { GoShieldCheck, GoShieldX  } from "react-icons/go";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  admin?: boolean;
}

interface UserCardProps {
  user: UserData;
  onToggleAdmin: (email: string, isAdmin: boolean) => Promise<boolean>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onToggleAdmin }) => {
  const [isAdmin, setIsAdmin] = useState(user.admin || false);

  const handleToggleAdmin = async () => {
    const newAdminStatus = !isAdmin;
    const res = await onToggleAdmin(user.email, newAdminStatus);
    if(res) setIsAdmin(newAdminStatus);
    
  };

  return (
    <div className=" rounded-lg shadow-md p-6 max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaUser className="text-primary w-8 h-8 mr-2" />
          <div>
            <h2 className="text-xl font-semibold text-primary">{`${user.firstName} ${user.lastName}`}</h2>
            <p className="text-sm text-gray-600">{isAdmin ? 'Administrador' : 'Usuario'}</p>
          </div>
        </div>
        <button
          onClick={handleToggleAdmin}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isAdmin ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'
          } hover:bg-accent-light hover:text-white`}
          aria-label={isAdmin ? 'Quitar permisos de administrador' : 'Hacer administrador'}
        >
          {isAdmin ? <GoShieldX className="w-6 h-6" /> : <GoShieldCheck className="w-6 h-6" />}
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <FaEnvelope className="text-secondary w-5 h-5 mr-2" />
          <p className="text-sm">{user.email}</p>
        </div>
        <div className="flex items-center">
          <FaPhone className="text-secondary w-5 h-5 mr-2" />
          <p className="text-sm">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

