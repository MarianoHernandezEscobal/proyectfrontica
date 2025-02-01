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

    const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
        let updatedValue: Filters[T] = value;

        if (key === "filterTypes") {
            if (value === "allTypes") {
                updatedValue = [] as Filters[T]; // Manejo especial para "allTypes"
            } else {
                const currentArray = (filters.filterTypes ?? []) as string[];

                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        } else if (key === "filterStatus") {
            if (value === "allStatus") { // Manejo especial para "allStatus"
                updatedValue = [] as Filters[T]; // Limpia la selección de estados
            } else if (Array.isArray(filters[key])) {
                const currentArray = (filters[key] ?? []) as string[];
                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        }
        else if (key === "filterHood") {   // Manejo especial para filterHood
            if (value === "" || value === "Cualquiera") {
                updatedValue = [] as Filters[T]; // Limpia la selección de barrios
            } else if (Array.isArray(filters[key])) {
                const currentArray = (filters[key] ?? []) as string[];
                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
            else if (key === "filterrooms") {   // Manejo especial para filterRooms
                if (value === "NoAplica") {
                    updatedValue = [] as Filters[T];
                } else if (Array.isArray(filters[key])) {
                    const currentArray = (filters[key] ?? []) as string[];
                    updatedValue = (currentArray.includes(value as string)
                        ? currentArray.filter(item => item !== value)
                        : [...currentArray, value]) as Filters[T];
                }
            }
            // Otros filtros que sean arrays
        } else if (Array.isArray(filters[key])) {
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
                    onFilterChange={(status) => handleFilterChange('filterStatus', status)}
                />
                <FilterByHood
                    currentFilters={filters.filterHood}
                    onFilterChange={(hood) => handleFilterChange('filterHood', hood)}
                />
                <FilterByRooms
                    currentFilters={filters.filterRooms}
                    onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
                />
                <div className="flex gap-8 justify-center mt-2">

                    <FilterByGarages
                        isChecked={filters.filterGarages}
                        onFilterChange={(garages) => handleFilterChange('filterGarages', garages)}
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

