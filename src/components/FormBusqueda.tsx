import React, { useState } from 'react';
import { Barrios } from '../assets/barrios';

const FormBusqueda: React.FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => setShowMoreOptions(!showMoreOptions);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <select
            id="neighborhood"
            defaultValue=""
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Seleccione ubicación</option>
            {Barrios.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            id="tipo"
            defaultValue=""
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
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="estado"
            defaultValue=""
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Seleccione estado</option>
            <option value="any">Indistinto</option>
            <option value="brand-new">A estrenar</option>
            <option value="for-sale">En venta</option>
            <option value="for-rent">En alquiler</option>
          </select>
        </div>
      </div>

      {showMoreOptions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">Dormitorios</label>
            <select
              id="rooms"
              defaultValue=""
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>Seleccione dormitorios</option>
              <option value="0">Indistinto</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="+">+</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Baños</label>
            <select
              id="bathrooms"
              defaultValue=""
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>Seleccione baños</option>
              <option value="0">Indistinto</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="+">+</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="garages" className="block text-sm font-medium text-gray-700">Garages</label>
            <select
              id="garages"
              defaultValue=""
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>Seleccione garages</option>
              <option value="0">Indistinto</option>
              <option value="yes">Si</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="piscina" className="block text-sm font-medium text-gray-700">Piscina</label>
            <select
              id="piscina"
              defaultValue=""
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>Seleccione piscina</option>
              <option value="0">Indistinto</option>
              <option value="yes">Si</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la casa</label>
            <input
              type="text"
              id="nombre"
              placeholder="Escriba el nombre"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={toggleMoreOptions}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-light bg-accent-light hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
        >
          {showMoreOptions ? 'Menos opciones' : 'Más opciones'}
        </button>
        <button
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-light bg-accent-light hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FormBusqueda;