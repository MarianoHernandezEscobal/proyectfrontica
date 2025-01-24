import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import { useAlert } from "../../contexts/AlertContext";
import { registerUser, getUsers } from "../../services/users/userService";
import { errorMessages } from "../../utils/errorMessages";
import {
  isValidName,
  isValidEmail,
  isValidPhoneNumber,
} from "../../utils/validations";
import CustomButton from "./ButtonProfile";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleRegistering: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  toggleRegistering,
}) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      phone: "",
    };

    if (!formData.firstName) {
      newErrors.firstName = errorMessages.firstName.required;
    } else if (!isValidName(formData.firstName)) {
      newErrors.firstName = errorMessages.firstName.invalid;
    }

    if (!formData.lastName) {
      newErrors.lastName = errorMessages.lastName.required;
    } else if (!isValidName(formData.lastName)) {
      newErrors.lastName = errorMessages.lastName.invalid;
    }

    if (!formData.email) {
      newErrors.email = errorMessages.email.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }

    if (!formData.password) {
      newErrors.password = errorMessages.password.required;
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = errorMessages.passwordsMismatch;
    }

    if (!formData.phone) {
      newErrors.phone = errorMessages.phone.required;
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await registerUser(formData);
      const user = await getUsers();
      sessionStorage.setItem("userData", JSON.stringify(user));
      showAlert("success", `Registro exitoso. ¡Bienvenido, ${user.firstName}!`);
      onClose();
    } catch (error) {
      let errorMessage = "Error al registrar el usuario";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showAlert("error", errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Apellido */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Repetir Contraseña */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repetir Contraseña"
              value={formData.repeatPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border rounded-md ${
                errors.repeatPassword ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute top-3 right-3 text-gray-400"
            >
              {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.repeatPassword && (
              <p className="text-red-500 text-xs">{errors.repeatPassword}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-center">
            <CustomButton type="submit" variant="primary" className="w-full">
              Registrarse
            </CustomButton>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={toggleRegistering}
            className="text-sm text-blue-500 hover:underline"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
