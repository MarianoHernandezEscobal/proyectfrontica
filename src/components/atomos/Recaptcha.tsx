import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { RecaptchaProps } from '../../utils/types';

const Recaptcha: React.FC<RecaptchaProps> = ({ onError, setIsChecked }) => {
  const siteKey = '6Leqab0qAAAAAGz3kpY6bzIv_wa2WijnD3OprEIh';

  const handleChange = (value: string | null) => {
    if (value) {
      setIsChecked(true);
      onError('');
    } else {
      setIsChecked(false);
      onError('Por favor completa el reCAPTCHA.');
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
