import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  onError: (message: string) => void;
  setIsChecked: (value: boolean) => void;
  setRecaptchaToken: (token: string) => void;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ onError, setIsChecked, setRecaptchaToken }) => {
  const siteKey = "6Leqab0qAAAAAGz3kpY6bzIv_wa2WijnD3OprEIh"; // Clave pública de reCAPTCHA v2

  const handleChange = (token: string | null) => {
    if (token) {
      setIsChecked(true);
      setRecaptchaToken(token); // Guardar el token para el backend
      onError("");
    } else {
      setIsChecked(false);
      onError("Por favor completa el reCAPTCHA.");
    }
  };

  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleChange}
        theme="light"
        hl="es"
      />
    </div>
  );
};

export default Recaptcha;
