// import React, { useState } from 'react';
// import SortByPriceButtons from './SortByPriceButtons';
// import FilterButtons from './FilterByType';
// import FilterByStatus from './FilterByStatus';
// import FilterByHood from './FilterByHood';
// import FilterByRooms from './FilterByRooms';
// import FilterByGarages from './FilterByGarages';
// import FilterByPool from './FilterByPool';
// import { Filters, FiltersPanelProps } from '../../utils/types';

// const FiltersPanel: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {
//     const [filters, setFilters] = useState<Filters>(initialFilters);

//     // const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
//     //     const updatedFilters = { ...filters, [key]: value };
//     //     setFilters(updatedFilters);
//     //     onFiltersChange(updatedFilters);
//     // };
//     const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
//         const updatedFilters = {
//             ...filters,
//             //eslint-disable-next-line 
//             [key]: Array.isArray(value) ? [...filters[key], ...(value as any)] : value,
//         };
//         setFilters(updatedFilters);
//         onFiltersChange(updatedFilters);
//     };

//     const handleClearFilters = () => {
//         const clearedFilters: Filters = {
//             filterTypes: [],
//             filterStatus: [],
//             filterHood: [],
//             filterRooms: null,
//             filterGarages: false,
//             filterPool: false,
//             sortOrder: null,
//         };
//         setFilters(clearedFilters);
//         onFiltersChange(clearedFilters);
//     };

//     return (
//         <div className="text-center">
//             <h2 className="text-lg font-bold">Filtros</h2>
//             <hr className="my-2" />
//             <button onClick={handleClearFilters} className="bg-gray-400 rounded-lg text-white font-bold hover:bg-gray-600 p-3 ">Limpiar Filtros</button>
//             <hr className="my-2" />
//             <SortByPriceButtons
//                 currentOrder={filters.sortOrder}
//                 onSortChange={(order) => handleFilterChange('sortOrder', order)}
//             />
//             <FilterButtons
//                 currentFilters={filters.filterTypes}
//                 onFilterChange={(types) => handleFilterChange('filterTypes', [types])}
//             />
//             <FilterByStatus
//                 currentFilters={filters.filterStatus}
//                 onFilterChange={(status) => handleFilterChange('filterStatus', [status])}
//             />
//             <FilterByHood
//                 currentFilters={filters.filterHood}
//                 onFilterChange={(hoods) => handleFilterChange('filterHood', [hoods])}
//             />
//             <FilterByRooms
//                 currentFilters={filters.filterRooms}
//                 onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
//             />
//             <FilterByGarages
//                 isChecked={filters.filterGarages}
//                 onFilterChange={(garages) => handleFilterChange('filterGarages', garages)}
//             />
//             <FilterByPool
//                 isChecked={filters.filterPool}
//                 onFilterChange={(pool) => handleFilterChange('filterPool', pool)}
//             />
//         </div>
//     );
// };

// export default FiltersPanel;
import React, { useState } from 'react';
import SortByPriceButtons from './SortByPriceButtons';
import FilterButtons from './FilterByType';
import FilterByStatus from './FilterByStatus';
import FilterByHood from './FilterByHood';
import FilterByRooms from './FilterByRooms';
import FilterByGarages from './FilterByGarages';
import FilterByPool from './FilterByPool';
import { Filters, FiltersPanelProps } from '../../utils/types';

const FiltersPanel: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const handleFilterChange = <T extends keyof Filters>(key: T, value: Filters[T]) => {
        let updatedValue:Filters[T] = value;

        // If the filter should be an array, make sure we're appending to it correctly
        // if (Array.isArray(filters[key])) {
        //     //eslint-disable-next-line 
        //     updatedValue = Array.isArray(value) ? [...filters[key], ...(value as any)] : [value];
        // }
        if (Array.isArray(filters[key])) {
            //eslint-disable-next-line 
            updatedValue = Array.isArray(value) ? ([...(filters[key] as any[]), ...(value as any)] as Filters[T]) : ([value] as Filters[T]);
        }

        if (key === 'filterGarages' && typeof value === 'boolean') {
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
        <div className="text-center">
            <h2 className="text-lg font-bold">Filtros</h2>
            <hr className="my-2" />
            <button onClick={handleClearFilters} className="bg-gray-400 rounded-lg text-white font-bold hover:bg-gray-600 p-3 ">Limpiar Filtros</button>
            <hr className="my-2" />
            <SortByPriceButtons
                currentOrder={filters.sortOrder}
                onSortChange={(order) => handleFilterChange('sortOrder', order)}
            />
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
    );
};

export default FiltersPanel;

