import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../utils/validations";
import { errorMessages } from "../utils/errorMessages";
import Title from "../components/atomos/Title";
import InputPhone from "../components/atomos/InputPhone";
import ChangePassword from "../components/atomos/ChangePassword";
import CustomButton from "../components/atomos/ButtonProfile";
import { updateUser } from "../services/users/userService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
    
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = { ...errors };

    if (!formData.firstName || !isValidName(formData.firstName)) {
      newErrors.firstName = errorMessages.firstName.invalid;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName || !isValidName(formData.lastName)) {
      newErrors.lastName = errorMessages.lastName.invalid;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email) {
      newErrors.email = errorMessages.email.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    } else {
      newErrors.email = "";
    }

    if (!formData.phone) {
      newErrors.phone = errorMessages.phone.required;
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    } else {
      newErrors.phone = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const updatedUser = await updateUser(formData);
        setFormData({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
        });
        sessionStorage.setItem("userData", JSON.stringify(updatedUser));
        showAlert("success", "Datos actualizados correctamente");

      } catch {
        showAlert("error", "Error al actualizar los datos");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Title text="Perfil de Usuario" />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 px-1 py-2 block w-full rounded-md shadow-sm ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block px-1 py-2 w-full rounded-md shadow-sm ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                className="mt-1 block w-full px-1 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100"
              />
            </div>

            <InputPhone
              phone={formData.phone}
              handleChange={handleChange}
              errors={{ phone: errors.phone }}
            />

            <div className="flex justify-between items-center pt-4">
              <CustomButton type="submit" variant="primary">
                Guardar Cambios
              </CustomButton>
              <CustomButton
                onClick={() => setShowPasswordModal(!showPasswordModal)}
                variant="outline"
              >
                {showPasswordModal
                  ? "Ocultar cambio de contraseña"
                  : "Cambiar contraseña"}
              </CustomButton>
            </div>
          </form>

          {showPasswordModal && (
            <div className="border-t border-gray-200 mt-6 pt-6">
              <ChangePassword />
            </div>
          )}
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 flex justify-around">
            <CustomButton
              onClick={() => navigate("/properties/created")}
              variant="secondary"
            >
              Mis propiedades
            </CustomButton>
            <CustomButton
              onClick={() => navigate("/properties/favourites")}
              variant="secondary"
            >
              Mis favoritas
            </CustomButton>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
