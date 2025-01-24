import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    clase?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ to, children, onClick, clase, type = 'button', disabled }) => {
    const isLink = Boolean(to);

    return isLink ? (
        <Link
            to={to as string}
            className={`btn py-2 px-7 inline-block cursor-pointer rounded text-base font-medium leading-normal transition ease-in-out 
                        text-text-light bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light active:bg-primary-dark 
                        disabled:bg-background-dark disabled:text-text-secondary disabled:cursor-not-allowed duration-300 ${clase}`}
            onClick={onClick}
        >
            {children}
        </Link>
    ) : (
        <button
            type={type}
            className={`btn py-2 px-3 inline-block cursor-pointer rounded text-base font-medium leading-normal transition ease-in-out 
                        text-text-light bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light active:bg-primary-dark 
                        disabled:bg-background-dark disabled:text-text-secondary disabled:cursor-not-allowed duration-300 ${clase}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
