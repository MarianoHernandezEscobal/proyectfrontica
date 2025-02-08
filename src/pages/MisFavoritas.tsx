import { useState, useEffect } from "react";
import Title from "../components/atomos/Title";
import {
  fetchFavourites,
} from "../services/properties/propertyService";
import { Property } from "../utils/types";
import Button from "../components/atomos/Button";
import PropertyCard from "../components/atomos/PropertyCard";

export const MisFavoritas = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      setProperties(JSON.parse(localStorage.getItem('createdProperties') || '[]'));
      if (!properties.length) {
        setProperties(await fetchFavourites());
      }
    };

    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-12 flex flex-col min-h-screen">
      <Title text="Mis Propiedades Favoritas" />

      <div className="flex flex-grow flex-col items-center">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index} className="py-4">
              <PropertyCard {...property} />
            </div>
          ))
        ) : (
          <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
        )}
        <Button
          onClick={() => window.history.back()}
          clase="mb-4 bg-primary-light hover:bg-primary-dark text-text-light fixed bottom-4 left-6 z-50"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
