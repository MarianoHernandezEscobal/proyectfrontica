export const isValidEmail = (email: string): boolean => {
  // Expresión regular para el formato **********@******.*** o ******.@****.***.**
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Expresión regular para números de teléfono en Uruguay, Argentina o Brasil
  const regex = /^(?:\+5989[1-9]\d{6}|09[1-9]\d{6})$/;
  return regex.test(phone);
};

export const isValidName = (name: string): boolean => {
  // Expresión regular para nombres que solo permiten letras
  const nameRegex = /^[a-zA-Z-ñ_Ñ]+$/;
  return nameRegex.test(name);
};

