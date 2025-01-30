import React, { useEffect, useState } from 'react';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { Filters, Property } from '../utils/types';
import FiltersPanel from '../components/Filtros/FiltersPanel';
import { useProperties } from '../contexts/PropertyContext';
import FiltersPanelMovil from '../components/Filtros/FiltersPanelMovil';
import Button from '../components/atomos/Button';
import SortByPriceButtons from '../components/Filtros/SortByPriceButtons';

import { useLocation } from 'react-router-dom';

const Propiedades: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const { properties } = useProperties();

    const location = useLocation();

    const [filters, setFilters] = useState<Filters>({
        filterTypes: [],
        filterStatus: [],
        filterHood: [],
        filterRooms: null,
        filterGarages: false,
        filterPool: false,
        sortOrder: null,
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filter = queryParams.get('filter');

        if (filter === 'sale') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                filterStatus: ['for_sale'],
            }));
        } else if (filter === 'rent') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                filterStatus: ['for_rent'],
            }));
        } else if (filter === 'pinned') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                pinned: true,
            }));
        }

    }, [location.search]);

    useEffect(() => {
        const loadAndFilterProperties = () => {
            setLoading(true);

            let filtered = [...properties];

            if (filters.filterStatus.length > 0) {
                filtered = filtered.filter(p =>
                    p.status.some(s => filters.filterStatus.includes(s))
                );
            }


            setFilteredProperties(filtered);
            setLoading(false);
        };

        loadAndFilterProperties();
    }, [properties, filters]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...properties];

            if (filters.filterTypes.length > 0) {
                filtered = filtered.filter(p => filters.filterTypes.includes(p.type));
            }
            // if (filters.filterStatus.length > 0) {
            //     filtered = filtered.filter(p => p.status.map(s => filters.filterStatus.includes(s)).includes(true));
            // }
            if (filters.filterStatus.length > 0) {
                filtered = filtered.filter(p =>
                    p.status.some(s => filters.filterStatus.includes(s))
                );
            }
            if (filters.filterHood.length > 0) {
                filtered = filtered.filter(p => p.neighborhood && filters.filterHood.includes(p.neighborhood));
            }
            if (filters.filterRooms) {
                filtered = filtered.filter(p => filters.filterRooms!.includes(p.rooms ? p.rooms : 0));
            }
            if (filters.filterGarages) {
                filtered = filtered.filter(p => p.garages);
            }
            if (filters.filterPool) {
                filtered = filtered.filter(p => p.pool);
            }
            if (filters.sortOrder) {
                filtered.sort((a, b) =>
                    filters.sortOrder === 'asc'
                        ? Number(a.price) - Number(b.price)
                        : Number(b.price) - Number(a.price)
                );
            }
            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [filters, properties]);

    // return (
    //     <div className="p-4 h-full">
    //         <div className="grid grid-rows-[auto,1fr] grid-cols-1 gap-4 h-full">
    //             <div className="flex flex-col md:flex-row items-center justify-center md:pl-2">
    //                 <Title text="Todas las Propiedades" size='large' />
    //             </div>
    //             <div className='flex justify-between'>
    //                 <p className="mt-3 pt-1 lg:pl-5 md:mt-0 md:ml-4 text-text-secondary">
    //                     Se están mostrando <span className="text-primary-light">{filteredProperties.length}</span> propiedades
    //                 </p>
    //                 <p className="hidden md:block mt-3 pt-1 lg:pl-5 md:mt-0 md:ml-4 text-text-secondary text-right">
    //                     <SortByPriceButtons
    //                         currentOrder={filters.sortOrder}
    //                         onSortChange={(order) => setFilters({ ...filters, sortOrder: order })}
    //                     />
    //                 </p>
    //             </div>
    //             <hr />
    //             <div className="flex flex-col md:flex-row gap-4">
    //                 <aside className="hidden mt-4 md:block md:w-1/4 w-full p-4 min-h-full rounded-lg sticky top-5 z-20">
    //                     <div className='text-center'>
    //                         <FiltersPanel
    //                             initialFilters={filters}
    //                             onFiltersChange={(updatedFilters) => setFilters(updatedFilters)}
    //                         />
    //                     </div>
    //                 </aside>

    //                 <div className="flex-1">
    //                     <div className="flex flex-col md:hidden mb-4 text-center">
    //                         <FiltersPanelMovil
    //                             initialFilters={filters}
    //                             onFiltersChange={(updatedFilters) => setFilters(updatedFilters)}
    //                         />
    //                     </div>

    //                     {loading ? (
    //                         <p className="text-primary">Cargando propiedades...</p>
    //                     ) : error ? (
    //                         <p className="text-status-error">{error}</p>
    //                     ) : (
    //                         <div>
    //                             {filteredProperties.length > 0 ? (
    //                                 filteredProperties.map((property, index) => (
    //                                     <div key={index} className="py-4">
    //                                         <PropertyHorizontalCard {...property} />
    //                                     </div>
    //                                 ))
    //                             ) : (
    //                                 <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
    //                             )}
    //                         </div>
    //                     )}
    //                     <Button
    //                         onClick={() => window.history.back()}
    //                         clase="mb-4 bg-primary-light hover:bg-primary-dark text-text-light fixed bottom-4 left-6 z-50"
    //                     >
    //                         Volver
    //                     </Button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div className="p-4 h-full">
            <div className="grid grid-rows-[auto,1fr] grid-cols-1 gap-4 h-full">
                <div className="flex flex-col md:flex-row items-center justify-center md:pl-2">
                    <Title text="Todas las Propiedades" size='large' />
                </div>
                <div className='flex justify-between'>
                    <p className="mt-3 pt-1 lg:pl-5 md:mt-0 md:ml-4 text-text-secondary">
                        Se están mostrando <span className="text-primary-light">{filteredProperties.length}</span> propiedades
                    </p>
                    <p className="hidden md:block mt-3 pt-1 lg:pl-5 md:mt-0 md:ml-4 text-text-secondary text-right">
                        <SortByPriceButtons
                            currentOrder={filters.sortOrder}
                            onSortChange={(order) => setFilters({ ...filters, sortOrder: order })}
                        />
                    </p>
                </div>
                <hr />
                <div className="flex flex-col md:flex-row gap-4">
                    <aside className="hidden mt-4 md:block md:w-1/4 w-full p-4 min-h-full rounded-lg sticky top-5 z-20 h-[calc(100vh-5rem)] overflow-y-auto"> {/* Altura fija y scroll */}
                        <div className='text-center'>
                            <FiltersPanel
                                initialFilters={filters}
                                onFiltersChange={(updatedFilters) => setFilters(updatedFilters)}
                            />
                        </div>
                    </aside>

                    <div className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto"> {/* Altura fija y scroll */}
                        <div className="flex flex-col md:hidden mb-4 text-center">
                            <FiltersPanelMovil
                                initialFilters={filters}
                                onFiltersChange={(updatedFilters) => setFilters(updatedFilters)}
                            />
                        </div>

                        {loading ? (
                            <p className="text-primary">Cargando propiedades...</p>
                        ) : error ? (
                            <p className="text-status-error">{error}</p>
                        ) : (
                            <div>
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map((property, index) => (
                                        <div key={index} className="py-4">
                                            <PropertyHorizontalCard {...property} />
                                        </div>
                                    ))
                                ) : (
                                    <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
                                )}
                            </div>
                        )}
                        <Button
                            onClick={() => window.history.back()}
                            clase="mb-4 bg-primary-light hover:bg-primary-dark text-text-light fixed bottom-4 left-6 z-50"
                        >
                            Volver
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Propiedades;
