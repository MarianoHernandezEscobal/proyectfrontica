import React, { useState } from 'react';
import FilterByType from './FilterByType';
import FilterByStatus from './FilterByStatus';
import FilterByHood from './FilterByHood';
import FilterByRooms from './FilterByRooms';
import FilterByGarages from './FilterByGarages';
import FilterByPool from './FilterByPool';
import { Filters, FiltersPanelProps } from '../../utils/types';
import Title from '../atomos/Title';

const FiltersPanel: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const handleRoomChange = (room: number | "NoAplica") => {
        let updatedFilters: number[] | null;

        if (room === "NoAplica") {
            updatedFilters = null; // "No Aplica"
        } else {
            const currentArray = filters.filterRooms ?? [];

            updatedFilters = currentArray.includes(room)
                ? currentArray.filter((r) => r !== room)  // Desmarcar habitación
                : [...currentArray, room];  // Marcar habitación
        }

        setFilters(prevFilters => {
            const updatedFiltersState = {
                ...prevFilters,
                filterRooms: updatedFilters,
            };
            onFiltersChange(updatedFiltersState);
            return updatedFiltersState;
        });
    };

    const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
        let updatedValue: Filters[T] = value;

        if (key === "filterTypes") { // Manejo especial para "allTypes"
            // @ts-expect-error value puede ser "allTypes"  
            if (value === "allTypes") {
                // @ts-expect-error value puede ser Filter[T]
                updatedValue = [] as Filters[T];
            } else {
                const currentArray = (filters.filterTypes ?? []) as string[];

                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        } else if (key === "filterStatus") { // Manejo especial para "allStatus"
            // @ts-expect-error value puede ser "allStatus"  
            if (value === "allStatus") {
                // @ts-expect-error value puede ser Filter[T]
                updatedValue = [] as Filters[T];
            } else if (Array.isArray(filters[key])) {
                const currentArray = (filters[key] ?? []) as string[];
                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        } else if (key === "filterHood") {   // Manejo especial para filterHood
            // @ts-expect-error value puede ser "Cualquiera"  
            if (value === "" || value === "Cualquiera") {
                // @ts-expect-error value puede ser Filter[T]
                updatedValue = [] as Filters[T];
            } else if (Array.isArray(filters[key])) {
                const currentArray = (filters[key] ?? []) as string[];
                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        }
        else if (key === "filterGarages") {
            updatedValue = value;
        }
        else if (key === "filterPool") {
            updatedValue = value;
        }
        // Otros filtros que sean arrays
        else if (Array.isArray(filters[key])) {
            const currentArray = (filters[key] ?? []) as string[];

            updatedValue = (currentArray.includes(value as string)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value]) as Filters[T];
        } else {
            updatedValue = value;
        }

        const updatedFilters = {
            ...filters,
            [key]: updatedValue,
        };

        setFilters(updatedFilters);
        onFiltersChange(updatedFilters);
    };



    const handleClearFilters = () => {
        const clearedFilters: Filters = {
            filterTypes: [],
            filterStatus: [],
            filterHood: [],
            filterRooms: null,
            filterGarages: false,
            filterPool: false,
            sortOrder: null,
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    return (
        <div className="text-center  ">
            <Title text="Filtros" />


            <hr className="my-2" />
            <div className="text-center border-r border-gray-400 p-4">
                <FilterByType
                    currentFilters={filters.filterTypes}
                    onFilterChange={(type) => {
                        setFilters((prevFilters) => {
                            const newFilterTypes = type === "allTypes"
                                ? []
                                : prevFilters.filterTypes.includes(type)
                                    ? prevFilters.filterTypes.filter(t => t !== type)
                                    : [...prevFilters.filterTypes, type];
                            const updatedFilters = { ...prevFilters, filterTypes: newFilterTypes };
                            // Propaga el cambio al componente padre:
                            onFiltersChange(updatedFilters);
                            return updatedFilters;
                        });
                    }}
                />

                <FilterByStatus
                    currentFilters={filters.filterStatus}
                    //@ts-expect-error hood status"
                    onFilterChange={(status) => handleFilterChange('filterStatus', status)}
                />
                <FilterByHood
                    currentFilters={filters.filterHood}
                    //@ts-expect-error hood blabla"
                    onFilterChange={(hood) => handleFilterChange('filterHood', hood)}
                />
                <FilterByRooms
                    currentFilters={filters.filterRooms}
                    //@ts-expect-error rooms blabla"
                    onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
                    handleRoomChange={handleRoomChange}  // Pasa la función al componente hijo
                />
                <div className="flex gap-8 justify-center mt-2">

                    <FilterByGarages
                        isChecked={filters.filterGarages}
                        onFilterChange={(garage) => handleFilterChange('filterGarages', garage)}
                    />
                    <FilterByPool
                        isChecked={filters.filterPool}
                        onFilterChange={(pool) => handleFilterChange('filterPool', pool)}
                    />
                </div>
            </div>
            <hr className="my-2" />
            <div className="flex justify-center">
                <button onClick={handleClearFilters} className="bg-gray-400 rounded-lg text-white font-bold hover:bg-gray-600 p-3 ">Limpiar Filtros</button>
            </div>
        </div>
    );
};

export default FiltersPanel;

