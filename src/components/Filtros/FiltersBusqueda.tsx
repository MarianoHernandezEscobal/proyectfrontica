import React, { useState } from 'react';
import FilterByTypeBusqueda from './FilterByTypeBusqueda';
import FilterByStatusBusqueda from './FilterByStatusBusqueda';
import FilterByHoodBusqueda from './FilterByHoodBusqueda';
import FilterByRoomsBusqueda from './FilterByRoomsBusqueda';
import FilterByGarages from './FilterByGarages';
import FilterByPool from './FilterByPool';
import FilterByTitleBusqueda from "./FilterByTitleBusqueda";
import { Filters, FiltersPanelProps } from '../../utils/types';
// import Title from '../atomos/Title';

const FiltersBusqueda: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    // const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

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

        if (key === "filterTitle") {
            updatedValue = value;
        } else if (key === "filterTypes") { // Manejo especial para "allTypes"
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
        console.log(">>> ", updatedValue)
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
            filterTitle: '',
            sortOrder: null,
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };


    return (
        <div className="text-center space-y-4">
            {/* Primera línea de filtros */}
            <div className="flex flex-wrap items-center justify-center gap-4 p-4 border-b border-gray-300">
                <FilterByTypeBusqueda currentFilters={filters.filterTypes}
                    //@ts-expect-error types blabla"
                    onFilterChange={(type) => handleFilterChange('filterTypes', type)} />
                <FilterByStatusBusqueda currentFilters={filters.filterStatus}
                    //@ts-expect-error types blabla"
                    onFilterChange={(status) => handleFilterChange('filterStatus', status)} />
                <FilterByHoodBusqueda currentFilters={filters.filterHood}
                    //@ts-expect-error types blabla"
                    onFilterChange={(hood) => handleFilterChange('filterHood', hood)} />

                <FilterByRoomsBusqueda
                    currentFilters={filters.filterRooms}
                    //@ts-expect-error rooms blabla"
                    onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
                    handleRoomChange={handleRoomChange}
                />

                <FilterByGarages isChecked={filters.filterGarages} onFilterChange={(garage) => handleFilterChange('filterGarages', garage)} />
                <FilterByPool isChecked={filters.filterPool} onFilterChange={(pool) => handleFilterChange('filterPool', pool)} />
                <hr />
                <FilterByTitleBusqueda
                    currentFilter={filters.filterTitle}
                    onFilterChange={(title) => handleFilterChange("filterTitle", title)}
                />
            </div>
            {/* )} */}

            <div className="flex justify-end p-4">
                <button
                    onClick={handleClearFilters}
                    className="bg-gray-400 rounded-lg text-white font-bold hover:bg-gray-600 px-4 py-2"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
};

export default FiltersBusqueda;
