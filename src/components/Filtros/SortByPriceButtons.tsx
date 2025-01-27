import React from 'react';
import { FaSortNumericDownAlt, FaSortNumericDown } from 'react-icons/fa';

interface SortByPriceButtonsProps {
    onSortChange: (order: 'asc' | 'desc') => void;
    currentOrder: 'asc' | 'desc' | null;
}

const SortByPriceButtons: React.FC<SortByPriceButtonsProps> = ({ onSortChange, currentOrder }) => {
    const isActive = (order: 'asc' | 'desc') => currentOrder === order;

    return (
        <div className='text-center font-bold text-lg'>
            <p>Ordenar por precio</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 mb-4">
                <button
                    onClick={() => onSortChange('asc')}
                    className={`flex items-center justify-center text-3xl gap-2 p-2 rounded-md 
                ${isActive('asc') ? 'bg-green-600' : 'bg-gray-400'} 
                text-white hover:bg-green-500 focus:outline-none`}
                >
                    <FaSortNumericDown />

                    <span className="md:text-base sm:text-lg">Asce</span>
                </button>
                <button
                    onClick={() => onSortChange('desc')}
                    className={`flex items-center justify-center text-3xl gap-2 p-2 rounded-md 
                ${isActive('desc') ? 'bg-green-600' : 'bg-gray-400'} 
                text-white hover:bg-green-500 focus:outline-none`}
                >
                    <FaSortNumericDownAlt />

                    <span className="md:text-base sm:text-lg">Desc</span>
                </button>
            </div>
        </div>
    );
};

export default SortByPriceButtons;
