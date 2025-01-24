import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PropertyStatus } from "../../utils/types";

interface FilterByStatusButtonsProps {
    onFilterChange: (status: string) => void;
    currentFilters: string[];
}

const statusLabels: Record<PropertyStatus, string> = {
    [PropertyStatus.ForSale]: "En Venta",
    [PropertyStatus.ForRent]: "En Alquiler",
    [PropertyStatus.Sold]: "Vendido",
    [PropertyStatus.Rented]: "Alquilado",
    [PropertyStatus.UnderConstruction]: "En Construcción",
    [PropertyStatus.Reserved]: "Reservado",
};

const FilterByStatus: React.FC<FilterByStatusButtonsProps> = ({
    onFilterChange,
    currentFilters,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (status: string) => currentFilters.includes(status);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-lg font-bold">Estado</p>
                <button
                    onClick={toggleExpand}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isExpanded && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <button
                        onClick={() => onFilterChange("all")}
                        className={`flex items-center justify-center gap-2 p-2 rounded-md 
                        ${currentFilters.length === 0 ? "bg-green-600" : "bg-gray-400"} 
                        text-white hover:bg-green-500 focus:outline-none`}
                    >
                        Todos
                    </button>
                    {Object.keys(PropertyStatus).map((key) => {
                        const status = PropertyStatus[key as keyof typeof PropertyStatus];
                        return (
                            <button
                                key={status}
                                onClick={() => onFilterChange(status)}
                                className={`flex items-center justify-center gap-2 p-2 rounded-md 
                                ${isActive(status) ? "bg-green-600" : "bg-gray-400"} 
                                text-white hover:bg-green-500 focus:outline-none`}
                            >
                                <span className="capitalize">{statusLabels[status]}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FilterByStatus;
