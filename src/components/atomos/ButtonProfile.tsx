import React from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  onClick, 
  type = 'button', 
  children, 
  variant = 'primary',
  className
}) => {
  const baseStyles = `${className} px-4 py-3 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`;

  const variantStyles = {
    primary: "bg-primary text-text-light hover:bg-primary-dark focus:ring-primary-light",
    secondary: "bg-secondary text-text-light hover:bg-secondary-dark focus:ring-secondary-light",
    outline: "bg-transparent border border-background-dark text-text-primary hover:bg-background-light focus:ring-primary-light"
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
