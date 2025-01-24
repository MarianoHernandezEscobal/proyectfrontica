import React, { useState } from "react";
import {
    FaHome,
    FaBuilding,
    FaWarehouse,
    FaStore,
    FaLandmark,
    FaCubes,
    FaEllipsisH,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";

interface FilterButtonsProps {
    onFilterChange: (type: string) => void;
    currentFilters: string[];
}

const iconMap = {
    Apartamento: <FaBuilding />,
    Almacen: <FaCubes />,
    Casa: <FaHome />,
    Comercio: <FaStore />,
    Oficina: <FaWarehouse />,
    Terreno: <FaLandmark />,
    Otro: <FaEllipsisH />,
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, currentFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (type: string) => currentFilters.includes(type);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-lg font-bold">Tipo</p>
                <button
                    onClick={toggleExpand}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isExpanded && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 mb-4">
                    <button
                        onClick={() => onFilterChange("all")}
                        className={`flex items-center justify-center gap-2 p-2 rounded-md 
                        ${currentFilters.length === 0 ? "bg-green-600" : "bg-gray-400"} 
                        text-white hover:bg-green-500 focus:outline-none`}
                    >
                        Todas
                    </button>
                    {Object.keys(iconMap).map((type) => (
                        <button
                            key={type}
                            onClick={() => onFilterChange(type)}
                            className={`flex items-center justify-center gap-2 p-2 rounded-md 
                            ${isActive(type) ? "bg-green-600" : "bg-gray-400"} 
                            text-white hover:bg-green-500 focus:outline-none`}
                        >
                            {iconMap[type as keyof typeof iconMap]}
                            <span className="capitalize">{type}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterButtons;
