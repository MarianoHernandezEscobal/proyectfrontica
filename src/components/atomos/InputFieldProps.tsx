import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  pattern?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  placeholder,
  type = 'text',
  inputMode,
  pattern,
  required = true,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-text-primary"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`w-full p-2 rounded-md mt-1 shadow-sm focus:ring-1 focus:outline-none sm:text-sm ${
        error
          ? 'border-status-error focus:ring-status-error focus:border-status-error'
          : 'border-background-dark focus:ring-primary-light focus:border-primary-light'
      }`}
      required={required}
      inputMode={inputMode}
      pattern={pattern}
    />
    {maxLength && (
      <div className="text-sm text-text-secondary mt-1">
        {maxLength - value.length} caracteres restantes
      </div>
    )}
    {error && (
      <div className="text-sm text-status-error mt-1">
        {error}
      </div>
    )}
  </div>
);

export default InputField;
