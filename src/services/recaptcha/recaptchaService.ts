import { BASE_URL } from "../../utils/constants";

export const validateRecaptcha = async (token: string | null) => {
    if (!token) return { success: false, message: "Token de reCAPTCHA no válido." };
  
    try {
      const response = await fetch(`${BASE_URL}/validate-recaptcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken: token }),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error en la validación de reCAPTCHA:", error);
      return { success: false, message: "Error en la validación del reCAPTCHA." };
    }
  };