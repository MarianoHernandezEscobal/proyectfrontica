import React, { useState } from "react";
import {
    FaHome,
    FaBuilding,
    FaWarehouse,
    FaStore,
    FaEllipsisH,
    FaChevronDown,
    FaChevronUp,
    FaTree,
} from "react-icons/fa";
import { MdBusiness } from "react-icons/md";

interface FilterByTypeProps {
    onFilterChange: (type: string) => void;
    currentFilters: string[];
}

const iconMap = {
    apartment: <FaBuilding />,
    warehouse: <FaWarehouse />,
    house: <FaHome />,
    store: <FaStore />,
    office: <MdBusiness />,
    land: <FaTree />,
    other: <FaEllipsisH />,
};
const typeLabels = {
    apartment: "Apartamento",
    warehouse: "Almacen",
    house: "Casa",
    store: "Comercio",
    office: "Oficina",
    land: "Terreno",
    other: "Otro",
};
const FilterByType: React.FC<FilterByTypeProps> = ({ onFilterChange, currentFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (type: string) => currentFilters.includes(type);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="text-left">
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">Tipo</p>
                <button
                    onClick={toggleExpand}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isExpanded && (
                <div className="flex flex-col mb-4">
                    <div
                        onClick={() => onFilterChange("allTypes")}
                        className={`flex items-center gap-2 p-1 cursor-pointer 
                        ${currentFilters.length === 0 ? "text-green-600" : "text-gray-600"} 
                        hover:text-green-500`}
                    >
                        <span className="md:text-base sm:text-lg">Todos los tipos</span>
                    </div>
                    {Object.keys(iconMap).map((type) => (
                        <div
                            key={type}
                            onClick={() => onFilterChange(type)}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${isActive(type) ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            {iconMap[type as keyof typeof iconMap]}
                            <span className="capitalize md:text-base sm:text-lg">{typeLabels[type as keyof typeof typeLabels]}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterByType;