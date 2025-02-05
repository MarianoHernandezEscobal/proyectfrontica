import React, { useEffect, useState } from 'react';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { Filters, Property } from '../utils/types';
import FiltersBusqueda from '../components/Filtros/FiltersBusqueda';
import { useProperties } from '../contexts/PropertyContext';
import Button from '../components/atomos/Button';
import { useNavigate } from 'react-router-dom';
// import FiltersPanelMovil from '../components/Filtros/FiltersPanelMovil';
// import Button from '../components/atomos/Button';
// import SortByPriceButtons from '../components/Filtros/SortByPriceButtons';

// import { useLocation } from 'react-router-dom';

const PropiedadesBusqueda: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const { properties } = useProperties();
    const navigate = useNavigate();


    // const location = useLocation();

    const [filters, setFilters] = useState<Filters>({
        filterTypes: [],
        filterStatus: [],
        filterHood: [],
        filterRooms: null,
        filterGarages: false,
        filterPool: false,
        filterTitle: '',
        sortOrder: null,
    });

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const filter = queryParams.get('filter');

    //     if (filter === 'sale') {
    //         setFilters((prevFilters) => ({
    //             ...prevFilters,
    //             filterStatus: ['for_sale'],
    //         }));
    //     } else if (filter === 'rent') {
    //         setFilters((prevFilters) => ({
    //             ...prevFilters,
    //             filterStatus: ['for_rent'],
    //         }));
    //     } else if (filter === 'pinned') {
    //         setFilters((prevFilters) => ({
    //             ...prevFilters,
    //             pinned: true,
    //         }));
    //     }

    // }, [location.search]);

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


    // useEffect(() => {
    //     const applyFilters = () => {
    //         let filtered = [...properties];

    //         if (filters.filterTypes.length > 0) {
    //             filtered = filtered.filter(p => filters.filterTypes.includes(p.type));
    //         }

    //         if (filters.filterStatus.length > 0) {
    //             filtered = filtered.filter(p =>
    //                 p.status.some(s => filters.filterStatus.includes(s))
    //             );
    //         }

    //         if (filters.filterHood.length > 0) {
    //             filtered = filtered.filter(p => {
    //                 if (!p.neighborhood) return false;
    //                 const propertyHood = p.neighborhood.trim().toLowerCase();
    //                 return filters.filterHood.some(
    //                     filtro => filtro.trim().toLowerCase() === propertyHood
    //                 );
    //             });
    //         }

    //         if (filters.filterRooms) {
    //             filtered = filtered.filter(p => filters.filterRooms!.includes(p.rooms ? p.rooms : 0));
    //         }
    //         if (filters.filterGarages) {
    //             filtered = filtered.filter(p => p.garage);
    //         }
    //         if (filters.filterPool) {
    //             filtered = filtered.filter(p => p.pool);
    //         }

    //         setFilteredProperties(filtered);
    //     };

    //     applyFilters();
    // }, [filters, properties]);

    useEffect(() => {
        const applyFilters = () => {
            if (
                filters.filterTypes.length === 0 &&
                filters.filterStatus.length === 0 &&
                filters.filterHood.length === 0 &&
                filters.filterRooms === null &&
                !filters.filterGarages &&
                !filters.filterPool &&
                !filters.filterTitle
            ) {
                setFilteredProperties([]); // No mostrar propiedades si no hay filtros activos
                return;
            }

            setLoading(true);
            let filtered = [...properties];

            if (filters.filterTypes.length > 0) {
                filtered = filtered.filter(p => filters.filterTypes.includes(p.type));
            }

            if (filters.filterStatus.length > 0) {
                filtered = filtered.filter(p =>
                    p.status.some(s => filters.filterStatus.includes(s))
                );
            }

            if (filters.filterHood.length > 0) {
                filtered = filtered.filter(p => {
                    if (!p.neighborhood) return false;
                    const propertyHood = p.neighborhood.trim().toLowerCase();
                    return filters.filterHood.some(
                        filtro => filtro.trim().toLowerCase() === propertyHood
                    );
                });
            }

            if (filters.filterRooms) {
                filtered = filtered.filter(p => filters.filterRooms!.includes(p.rooms ? p.rooms : 0));
            }
            if (filters.filterGarages) {
                filtered = filtered.filter(p => p.garage);
            }
            if (filters.filterPool) {
                filtered = filtered.filter(p => p.pool);
            }

            setFilteredProperties(filtered);
            setLoading(false);
        };

        applyFilters();
    }, [filters, properties]);

    return (
        <div className="">
            <div className="">

                <div className="">
                    <div className='text-center'>
                        <FiltersBusqueda
                            initialFilters={filters}
                            onFiltersChange={(updatedFilters) => setFilters(updatedFilters)}
                        />

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
                                    <Title text="Utiliza los filtros para buscar propiedades" />
                                )}
                            </div>
                        )}
                        <div className="py-3">
                            <Button onClick={() => navigate("/properties")}>Ir a propiedades</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropiedadesBusqueda;
