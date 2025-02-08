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

    const handleRoomChange = (room: number | "NoAplica") => {
        let updatedFilters: number[] | null;

        if (room === "NoAplica") {
            updatedFilters = null;
        } else {
            const currentArray = filters.filterRooms ?? [];

            updatedFilters = currentArray.includes(room)
                ? currentArray.filter((r) => r !== room)
                : [...currentArray, room];
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

        if (key === "filterTypes") {
            if (value === "allTypes") {
                // @ts-expect-error value puede ser Filter[T]
                updatedValue = [] as Filters[T];
            } else {
                const currentArray = (filters.filterTypes ?? []) as string[];

                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        } else if (key === "filterStatus") {
            if (value === "allStatus") {
                // @ts-expect-error value puede ser Filter[T]
                updatedValue = [] as Filters[T];
            } else if (Array.isArray(filters[key])) {
                const currentArray = (filters[key] ?? []) as string[];
                updatedValue = (currentArray.includes(value as string)
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]) as Filters[T];
            }
        } else if (key === "filterHood") {
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
            filterTitle: '',
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
                    <FilterByGarages
                        isChecked={filters.filterGarages}
                        onFilterChange={(garage) => handleFilterChange('filterGarages', garage)}
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
