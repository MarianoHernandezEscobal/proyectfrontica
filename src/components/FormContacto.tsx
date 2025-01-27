import React, { useState } from "react";
import Button from "./atomos/Button";
import TextareaField from "./atomos/TextareaField";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
import Recaptcha from "./atomos/Recaptcha";
import { errorMessages } from "../utils/errorMessages";
import { sendEmail } from "../services/mail/mailService";
import InputPhone from "./atomos/InputPhone";

const FormContacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    recaptcha: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const [isChecked, setIsChecked] = useState(false);
  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : errorMessages.firstName.required,
      email: formData.email ? "" : errorMessages.email.required,
      message: formData.message ? "" : errorMessages.message.required,
      phone: formData.phone ? "" : errorMessages.phone.required,
      recaptcha: isChecked ? "" : errorMessages.recaptcha.required,
    };

    // Validación de formato adicional
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulario enviado:", formData);
      sendEmail({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name: formData.name,
        from: formData.email,
        phone: formData.phone,
        content: formData.message,
        subject: `Consulta de pagina ${formData.name}`,
        isRent: false,
      });
    }
  };

  const handleRecaptchaError = (error: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, recaptcha: error }));
  };

  const MAX_DESCRIPTION_CHARACTERS = 500;

  return (
    <section id="contact-form" className="p-4 max-w-lg mx-auto">
      <form
        className="space-y-4"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-text-primary"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`border p-2 rounded-md ${errors.name ? "border-status-error" : "border-background-dark"
              }`}
            placeholder="Tu Nombre"
            required
          />
          {errors.name && (
            <span className="text-status-error text-sm">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-text-primary"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-2 rounded-md ${errors.email ? "border-status-error" : "border-background-dark"
              }`}
            placeholder="Tu Correo Electrónico"
            required
          />
          {errors.email && (
            <span className="text-status-error text-sm">{errors.email}</span>
          )}
        </div>
        <InputPhone
          phone={formData.phone}
          handleChange={handleChange}
          errors={{ phone: errors.phone }}
          inputClassName={`border focus:border-2 ${errors.name ? "border-status-error" : "border-background-dark"
            }`}
        />
        <div className="flex flex-col">
          <TextareaField
            label="Mensaje"
            value={formData.message}
            onChange={handleChange}
            name="message"
            error={errors.message}
            maxLength={MAX_DESCRIPTION_CHARACTERS}
            rows={10}
          />
        </div>

        <Button
          type="submit"
          clase="bg-primary-light hover:bg-primary-dark text-text-light font-bold py-2 px-4 rounded"
        >
          Enviar
        </Button>
        <div className="flex flex-col justify-center">
          <Recaptcha
            onError={handleRecaptchaError}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          {errors.recaptcha && (
            <span className="text-status-error text-sm">
              {errors.recaptcha}
            </span>
          )}
        </div>
      </form>

      <div id="error-container" className="text-status-error"></div>
      <div id="message-container" className="text-status-success"></div>
    </section>
  );
};

export default FormContacto;
