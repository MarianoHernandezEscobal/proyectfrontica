import React, { useState } from 'react';
import SortByPriceButtons from './SortByPriceButtons';
import FilterButtons from './FilterByType';
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

    const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
        const updatedFilters = { ...filters, [key]: value };
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
                <div className="p-4 bg-gray-100 border-b">
                    <SortByPriceButtons
                        currentOrder={filters.sortOrder}
                        onSortChange={(order) => handleFilterChange('sortOrder', order)}
                    />
                </div>
            )}

            {showFilterMenu && (
                <div className="p-4 bg-gray-100">
                    <FilterButtons
                        currentFilters={filters.filterTypes}
                        onFilterChange={(types) => handleFilterChange('filterTypes', [types])}
                    />
                    <FilterByStatus
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
                    />
                    <FilterByGarages
                        isChecked={filters.filterGarages}
                        onFilterChange={(garages) => handleFilterChange('filterGarages', garages)}
                    />
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
