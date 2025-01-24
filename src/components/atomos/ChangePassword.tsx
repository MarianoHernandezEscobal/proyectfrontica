import React, { useState } from "react";
import CustomButton from "./ButtonProfile";
import { errorMessages } from "../../utils/errorMessages";
import { changePassword } from "../../services/users/userService";
import { useAlert } from "../../contexts/AlertContext";
import PasswordInput from "./PasswordInput";

const ChangePassword: React.FC = () => {
  const { showAlert } = useAlert();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePasswordFields = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = errorMessages.password.required;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = errorMessages.password.required;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = errorMessages.passwordsMismatch;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordFields()) {
      try {
        const response = await changePassword(passwordData);
        if (response.ok) {
          showAlert("success", "Contraseña actualizada correctamente");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          showAlert("error", "Error al actualizar la contraseña");
        }
      } catch {
        showAlert("error", "Error al actualizar la contraseña");
      }
    }
  };

  return (
    <div className="mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-text-primary">
        Cambiar Contraseña
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label
            className="block text-sm font-medium mb-2 text-text-primary"
            htmlFor="currentPassword"
          >
            Contraseña actual
          </label>
          <PasswordInput
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            placeholder="Escriba su contraseña"
          />
        </div>

        <div>
          <label
            className="block text-sm mb-2 font-medium text-text-primary"
            htmlFor="newPassword"
          >
            Nueva contraseña
          </label>
            <PasswordInput
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              placeholder="Escriba su nueva contraseña"
            />
        </div>

        <div>
          <label
            className="block text-sm mb-2 font-medium text-text-primary"
            htmlFor="confirmPassword"
          >
            Confirmar nueva contraseña
          </label>
          <PasswordInput
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Escriba su nueva contraseña"
          />
        </div>

        <div className="flex justify-end">
          <CustomButton type="submit" variant="primary">
            Cambiar Contraseña
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;