
import React, { useEffect, useState } from 'react';
// import { Barrios } from '../assets/barrios';
// import { useProperties } from '../contexts/PropertyContext';
// import Title from './atomos/Title';
// import PropertyHorizontalCard from './atomos/PropertyHorizontalCard';
import FilterByGarages from './Filtros/FilterByGarages';
import FilterByPool from './Filtros/FilterByPool';
import FilterByType from './Filtros/FilterByType';
import { Filters, FiltersPanelProps } from '../utils/types';
import FilterByHood from './Filtros/FilterByHood';
import FilterByStatus from './Filtros/FilterByStatus';
import FilterByRooms from './Filtros/FilterByRooms';


const FormBusqueda: React.FC<FiltersPanelProps> = ({ initialFilters, onFiltersChange }) => {

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  // const { properties } = useProperties();
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const toggleMoreOptions = () => setShowMoreOptions(!showMoreOptions);

  // const [readyToShow, setReadyToShow] = useState(false); // Nuevo estado para controlar la visualización de propiedades

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
    console.log(">>> Filtros limpiados:", clearedFilters);
  };

  useEffect(() => {
    console.log(">>> Filtros actualizados:", filters);
  }, [filters]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ubicación */}
        <div className="space-y-2">
          {/* <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <select
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Seleccione ubicación</option>
            {Barrios.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select> */}
          <FilterByHood
            currentFilters={filters.filterHood}
            //@ts-expect-error hood blabla"
            onFilterChange={(hood) => handleFilterChange('filterHood', hood)}
          />
        </div>

        {/* Tipo */}
        <div className="space-y-2">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
          {/* <select
            id="tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Seleccione tipo</option>
            <option value="any">Indistinto</option>
            <option value="storage">Almacén</option>
            <option value="apartament">Apartamento</option>
            <option value="house">Casa</option>
            <option value="comerce">Comercio</option>
            <option value="office">Oficina</option>
            <option value="land">Terreno</option>
            <option value="other">Otros</option>
          </select> */}
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
        </div>

        {/* Estado */}
        <div className="space-y-2">
          {/* <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Seleccione estado</option>
            <option value="any">Indistinto</option>
            <option value="brand-new">A estrenar</option>
            <option value="for-sale">En venta</option>
            <option value="for-rent">En alquiler</option>
          </select> */}
          <FilterByStatus
            currentFilters={filters.filterStatus}
            //@ts-expect-error hood status"
            onFilterChange={(status) => handleFilterChange('filterStatus', status)}
          />
        </div>
      </div>

      {showMoreOptions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Más opciones... */}
          <FilterByRooms
            currentFilters={filters.filterRooms}
            //@ts-expect-error rooms blabla"
            onFilterChange={(rooms) => handleFilterChange('filterRooms', rooms)}
            handleRoomChange={handleRoomChange}
          />
          <div className="space-y-2">
            <label htmlFor="garage" className="block text-sm font-medium text-gray-700">Garages</label>
            <FilterByGarages
              isChecked={filters.filterGarages}
              onFilterChange={(garage) => setFilters({ ...filters, filterGarages: garage })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="piscina" className="block text-sm font-medium text-gray-700">Piscina</label>
            <FilterByPool
              isChecked={filters.filterPool}
              onFilterChange={(pool) => setFilters({ ...filters, filterPool: pool })}
            />
          </div>

          {/* <div className="space-y-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la casa</label>
            <input
              type="text"
              id="nombre"
              placeholder="Escriba el nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div> */}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={toggleMoreOptions}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-light bg-accent-light hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
        >
          {showMoreOptions ? 'Menos opciones' : 'Más opciones'}
        </button>
        <div className=''>
          <button
            onClick={handleClearFilters}
            className="mx-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-light bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
          >
            Limpiar Filtros
          </button>
          {/* <button
            onClick={handleSearch}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-light bg-accent-light hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
          >
            Buscar
          </button> */}
        </div>
      </div>

      Renderizado de propiedades filtradas
      {/* {readyToShow ? (
        filteredProperties.length === 0 ? (
          <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
        ) : (
          filteredProperties.map((property, index) => (
            <div key={index} className="py-4">
              <PropertyHorizontalCard {...property} />
            </div>
          ))
        )
      ) : null} */}
    </div>
  );
};

export default FormBusqueda;