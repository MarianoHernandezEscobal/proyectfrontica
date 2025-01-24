import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "Contraseña",
  error,
  maxLength = 20,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative">
        {/* Icono de candado */}
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        {/* Campo de entrada */}
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {/* Botón para alternar visibilidad */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? (
            <FaEye className="h-5 w-5" />
          ) : (
            <FaEyeSlash className="h-5 w-5" />
          )}
        </button>

        {/* Mensaje de error */}
      </div>
      <>{error && <p className="text-sm text-red-500 mt-1">{error}</p>}</>
    </>
  );
};

export default PasswordInput;
