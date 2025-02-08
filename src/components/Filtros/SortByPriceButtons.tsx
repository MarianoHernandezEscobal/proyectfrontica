import React, { useState } from 'react';
import { FaSortNumericDownAlt, FaSortNumericDown, FaStar } from 'react-icons/fa';

interface SortByPriceButtonsProps {
    onSortChange: (order: 'asc' | 'desc' | 'pinned') => void;
    currentOrder: 'asc' | 'desc' | 'pinned' | null;
}

const SortByPriceButtons: React.FC<SortByPriceButtonsProps> = ({ onSortChange, currentOrder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (order: 'asc' | 'desc' | 'pinned') => {
        onSortChange(order);
        setIsOpen(false);
    };

    const getSelectedOption = () => {
        switch (currentOrder) {
            case 'asc':
                return (
                    <>
                        <FaSortNumericDown className="inline-block mr-2" />
                        Ascendente
                    </>
                );
            case 'desc':
                return (
                    <>
                        <FaSortNumericDownAlt className="inline-block mr-2" />
                        Descendente
                    </>
                );
            default:
                return (
                    <>
                        <FaStar className="inline-block mr-2" />
                        Más relevantes
                    </>
                );
        }
    };

    return (
        <div className='text-center font-bold text-lg ui-search-view-options z-0'>
            <div className="ui-search-view-options__content flex items-center relative ">
                <div className="ui-search-view-options__title mr-2">Ordenar por:</div>

                <div className="relative z-10">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="andes-dropdown andes-dropdown--standalone ui-search-sort-filter__dropdown andes-dropdown--small p-2 border rounded"
                    >
                        {getSelectedOption()}
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 bg-white border rounded shadow-lg mt-1">
                            <div onClick={() => handleSortChange('pinned')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                                <FaStar className="mr-2" /> Más relevantes
                            </div>
                            <div onClick={() => handleSortChange('asc')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                                <FaSortNumericDown className="mr-2" /> Ascendente
                            </div>
                            <div onClick={() => handleSortChange('desc')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                                <FaSortNumericDownAlt className="mr-2" /> Descendente
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SortByPriceButtons;