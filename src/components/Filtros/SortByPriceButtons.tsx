// import React from 'react';
// import { FaSortNumericDownAlt, FaSortNumericDown } from 'react-icons/fa';

// interface SortByPriceButtonsProps {
//     onSortChange: (order: 'asc' | 'desc') => void;
//     currentOrder: 'asc' | 'desc' | null;
// }

// const SortByPriceButtons: React.FC<SortByPriceButtonsProps> = ({ onSortChange, currentOrder }) => {
//     const isActive = (order: 'asc' | 'desc') => currentOrder === order;

//     return (
//         <div className='text-center font-bold text-lg'>
//             <p>Ordenar por precio</p>
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 mb-4">
//                 <button
//                     onClick={() => onSortChange('asc')}
//                     className={`flex items-center justify-center text-3xl gap-2 p-2 rounded-md 
//                 ${isActive('asc') ? 'bg-green-600' : 'bg-gray-400'} 
//                 text-white hover:bg-green-500 focus:outline-none`}
//                 >
//                     <FaSortNumericDown />

//                     <span className="md:text-base sm:text-lg">Asce</span>
//                 </button>
//                 <button
//                     onClick={() => onSortChange('desc')}
//                     className={`flex items-center justify-center text-3xl gap-2 p-2 rounded-md 
//                 ${isActive('desc') ? 'bg-green-600' : 'bg-gray-400'} 
//                 text-white hover:bg-green-500 focus:outline-none`}
//                 >
//                     <FaSortNumericDownAlt />

//                     <span className="md:text-base sm:text-lg">Desc</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SortByPriceButtons;
import React, { useState } from 'react';
import { FaSortNumericDownAlt, FaSortNumericDown, FaStar } from 'react-icons/fa';

interface SortByPriceButtonsProps {
    onSortChange: (order: 'asc' | 'desc' | 'relevant') => void;
    currentOrder: 'asc' | 'desc' | 'relevant' | null;
}

const SortByPriceButtons: React.FC<SortByPriceButtonsProps> = ({ onSortChange, currentOrder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (order: 'asc' | 'desc' | 'relevant') => {
        onSortChange(order);
        setIsOpen(false); // Cerrar el menú después de seleccionar
    };

    // Función para obtener el icono y el texto correspondiente
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
        <div className='text-center font-bold text-lg ui-search-view-options'>
            <div className="ui-search-view-options__content flex items-center relative ">
                <div className="ui-search-view-options__title mr-2">Ordenar por:</div>

                <div className="relative z-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="andes-dropdown andes-dropdown--standalone ui-search-sort-filter__dropdown andes-dropdown--small p-2 border rounded"
                    >
                        {getSelectedOption()}
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 bg-white border rounded shadow-lg mt-1">
                            <div onClick={() => handleSortChange('relevant')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
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