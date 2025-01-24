import { useState, useEffect } from "react";
import Title from "../components/atomos/Title";
import {
  fetchFavourites,
} from "../services/properties/propertyService";
import { Property } from "../utils/types";
import PropertyHorizontalCard from "../components/atomos/PropertyHorizontalCard";

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
  }, []);
  return (
    <div className="my-12">
      <Title text="Mis Propiedades Favoritas" />

      <div className="flex flex-col items-center">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index} className="py-4">
              <PropertyHorizontalCard {...property} />
            </div>
          ))
        ) : (
          <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
        )}
      </div>
    </div>
  );
};
