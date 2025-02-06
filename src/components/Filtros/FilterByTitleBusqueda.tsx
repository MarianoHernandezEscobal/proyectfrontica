import React, { useEffect, useState } from "react";

interface FilterByTitleBusquedaProps {
    onFilterChange: (title: string) => void;
    currentFilter: string;
}

const FilterByTitleBusqueda: React.FC<FilterByTitleBusquedaProps> = ({
    onFilterChange,
    currentFilter,
}) => {
    const [searchTerm, setSearchTerm] = useState(currentFilter);

    useEffect(() => {
        setSearchTerm(currentFilter);
    }, [currentFilter]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onFilterChange(value);
    };

    return (
        <div className="lg:flex text-center lg:w-[80%]">
            <label htmlFor="title-search" className="text-lg font-bold px-1 mt-2 w-[28%]">
                Buscar por nombre
            </label>
            <input
                id="title-search"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Escribe un nombre..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
};

export default FilterByTitleBusqueda;
