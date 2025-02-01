import React, { useState } from 'react';
import SortByPriceButtons from './SortByPriceButtons';
import FilterByType from './FilterByType';
import FilterByStatus from './FilterByStatus';
import FilterByHood from './FilterByHood';
import FilterByRooms from './FilterByRooms';
import FilterByGarages from './FilterByGarages';
import FilterByPool from './FilterByPool';
import { Filters, FiltersPanelProps } from '../../utils/types';
import Title from '../atomos/Title';
import { FaSlidersH } from 'react-icons/fa';
import { PiArrowsDownUpBold } from "react-icons/pi";

const FiltersPanelMovil: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
    //     const updatedFilters = { ...filters, [key]: value };
    //     setFilters(updatedFilters);
    //     onFiltersChange(updatedFilters);
    // };
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
        <div className="flex flex-col">
            <div className="flex justify-around p-4 border-b">
                <button
                    className="flex items-center text-gray-700"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                >
                    <PiArrowsDownUpBold className="w-6 h-6 mr-2" />

                    <Title text="Ordenar" size='small' />

                </button>
                <button
                    className="flex items-center text-gray-700"
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                    <FaSlidersH className="w-6 h-6 mr-2" />

                    <Title text="Filtros" size='small' />

                </button>
            </div>

            {showSortMenu && (
                <div className="p-4 bg-gray-100 border-b mx-auto">
                    <SortByPriceButtons
                        currentOrder={filters.sortOrder}
                        onSortChange={(order) => handleFilterChange('sortOrder', order)}
                    />
                </div>
            )}

            {showFilterMenu && (
                <div className="p-4 bg-gray-100">
                    {/* <FilterByType
                        currentFilters={filters.filterTypes}
                        onFilterChange={(types) => handleFilterChange('filterTypes', [types])}
                    /> */}
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
                    {/* <FilterByStatus
                        currentFilters={filters.filterStatus}
                        onFilterChange={(status) => handleFilterChange('filterStatus', [status])}
                    />
                    <FilterByHood
                        currentFilters={filters.filterHood}
                        onFilterChange={(hoods) => handleFilterChange('filterHood', [hoods])}
                    />
                    <FilterByRooms
                        currentFilters={filters.filterRooms}
                        onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
                    /> */}
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
                    <FilterByGarages
                        isChecked={filters.filterGarages}
                        onFilterChange={(garages) => handleFilterChange('filterGarages', garages)}
                    />
                    <br />
                    <FilterByPool
                        isChecked={filters.filterPool}
                        onFilterChange={(pool) => handleFilterChange('filterPool', pool)}
                    />
                    <button
                        onClick={handleClearFilters}
                        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default FiltersPanelMovil;
