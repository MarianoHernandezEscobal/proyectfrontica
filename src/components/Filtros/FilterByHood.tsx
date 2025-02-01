import React, { useState } from "react";
import { Barrios } from "../../assets/barrios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FilterByHoodProps {
    onFilterChange: (neighborhood: string) => void;
    currentFilters: string[];
}

const FilterByHood: React.FC<FilterByHoodProps> = ({ onFilterChange, currentFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (neighborhood: string) => {
        // Verifica si el barrio es "Cualquiera" y si el valor de currentFilters es vacío o "Cualquiera"
        if (neighborhood === "Cualquiera") {
            return currentFilters.length === 0 || currentFilters.includes("Cualquiera");
        }
        return currentFilters.includes(neighborhood);
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleItemClick = (neighborhood: string) => {
        if (neighborhood === "Cualquiera" && currentFilters.includes("Cualquiera")) {
            // Si "Cualquiera" ya está seleccionado, lo deseleccionamos.
            onFilterChange("");
        } else {
            onFilterChange(neighborhood);
        }
    };

    return (
        <div className="text-left"> {/* Alineación a la izquierda */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">Barrio</p>
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
                        onClick={() => handleItemClick("Cualquiera")}
                        className={`flex items-center gap-2 p-1 cursor-pointer 
                        ${isActive("Cualquiera") ? "text-green-600" : "text-gray-600"} 
                        hover:text-green-500`}
                    >
                        <span>Todos los barrios</span>
                    </div>
                    {Barrios.filter(barrio => barrio.label !== "Cualquiera").map((barrio) => (
                        <div
                            key={barrio.label}
                            onClick={() => handleItemClick(barrio.label)}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${isActive(barrio.label) ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span className="md:text-base sm:text-lg">{barrio.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterByHood;