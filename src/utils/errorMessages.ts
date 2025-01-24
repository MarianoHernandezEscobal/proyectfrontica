// import { format } from "date-fns";

export const errorMessages = {
  title: {
    required: "El nombre es requerido.",
    minLength: "Debe tener más de 5 caracteres",
    maxLength: "Has alcanzado el límite de caracteres.",
  },
  imageSrc: "Al menos una imagen es requerida.",
  description: {
    required: "La descripción es requerida.",
    maxLength: "Has alcanzado el límite de caracteres.",
  },
  status: "El estado es requerido.",
  price: {
    required: "El precio es requerido.",
    invalid: "Debes ingresar un monto",
  },
  contribucion: {
    required: "El precio es requerido.",
    invalid: "Debes ingresar un monto",
  },
  type: "El tipo de propiedad es requerido.",
  neighborhood: "El barrio es requerido.",
  geoCoordinates: "Debe seleccionar una ubicación en el mapa.",
  firstName: {
    required: "El nombre es requerido.",
    invalid: "Por favor solo ingrese letras",
  },
  lastName: {
    required: "El apellido es requerido.",
    invalid: "Por favor solo ingrese letras",
  },
  email: {
    required: "El email es requerido.",
    invalid: "Formato de email inválido. Formato requerido: nombre@domain.com",
  },  
  phone: {
    required: 'El número de teléfono es obligatorio.',
    invalid: 'Ingrese un número de teléfono válido en el formato +59895385147 o 095385147.',
    formatos:
      "Formatos validos: 09x xxx xxx o +598 9x xxx xxx",
  },
  message: {
    required: "El mensaje es requerido.",
  },
  recaptcha: {
    required: "Por favor completa el reCAPTCHA.",
  },
  password: {
    required: "La contraseña es requerida.",
    invadlid: "La contraseña es invalida.",
    formatos:
      "La contraseña debe tener al menos 8 caracteres, por lo menos un número y un carácter especial (. - # ! $ % & ).",
  },
  passwordsMismatch: "Las contraseñas no coinciden.",
};

