import React, { useState } from "react";
import Button from "./atomos/Button";
import TextareaField from "./atomos/TextareaField";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
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
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : errorMessages.firstName.required,
      email: formData.email ? "" : errorMessages.email.required,
      message: formData.message ? "" : errorMessages.message.required,
      phone: formData.phone ? "" : errorMessages.phone.required,
    };

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await sendEmail({
        name: formData.name,
        from: formData.email,
        phone: formData.phone,
        content: formData.message,
        subject: `Consulta de página - ${formData.name}`,
        isRent: false,
      });
      alert("Mensaje enviado con éxito.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un problema al enviar el mensaje.");
    }
  };

  return (
    <section id="contact-form" className="p-4 max-w-lg mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`border p-2 rounded-md ${errors.name ? "border-status-error" : "border-background-dark"}`}
            placeholder="Tu Nombre"
            required
          />
          {errors.name && <span className="text-status-error text-sm">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-2 rounded-md ${errors.email ? "border-status-error" : "border-background-dark"}`}
            placeholder="Tu Correo Electrónico"
            required
          />
          {errors.email && <span className="text-status-error text-sm">{errors.email}</span>}
        </div>

        <InputPhone
          phone={formData.phone}
          handleChange={handleChange}
          errors={{ phone: errors.phone }}
          inputClassName={`border focus:border-2 ${errors.phone ? "border-status-error" : "border-background-dark"}`}
        />

        <div className="flex flex-col">
          <TextareaField
            label="Mensaje"
            value={formData.message}
            onChange={handleChange}
            name="message"
            error={errors.message}
            maxLength={500}
            rows={10}
          />
        </div>

        <div className="flex flex-col justify-center">

        </div>

        <Button type="submit" clase="bg-primary-light hover:bg-primary-dark text-text-light font-bold py-2 px-4 rounded">
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default FormContacto;
