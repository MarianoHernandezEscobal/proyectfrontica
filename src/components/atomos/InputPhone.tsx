import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { errorMessages } from '../../utils/errorMessages';

interface InputPhoneProps {
  phone: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    phone: string;
  };
  inputClassName?: string;
}

const InputPhone: React.FC<InputPhoneProps> = ({ phone, inputClassName, handleChange, errors }) => {
  return (
    <div className="relative">
      <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
        Teléfono
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Tu teléfono"
          className={`${inputClassName} block w-full px-1 py-2 pr-10 rounded-md ${errors.phone ? 'border-status-error' : 'border-background-dark'
            } focus:outline-none  focus:ring-accent-dark focus:border-accent-dark`}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-auto pr-3">
          <div className="group relative">
            <FaInfoCircle className="h-5 w-5 text-text-secondary cursor-pointer" />

            <div className="absolute hidden group-hover:block right-0 bottom-full mb-2 w-48 bg-background-neutral text-text-light text-xs rounded py-1 px-2 shadow-lg">
              {errorMessages.phone.formatos}
            </div>
          </div>
        </div>
      </div>

      {errors.phone && (
        <p className="mt-2 text-sm text-status-error">{errors.phone}</p>
      )}
    </div>
  );
};

export default InputPhone;
