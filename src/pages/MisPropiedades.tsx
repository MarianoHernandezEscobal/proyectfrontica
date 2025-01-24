
import { useEffect, useState } from 'react';
import Title from '../components/atomos/Title'
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import { Property } from '../utils/types';
import { fetchCreated } from '../services/properties/propertyService';

export const MisPropiedades = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    
    useEffect(() => {
        const loadProperties = async () => {
            setProperties(JSON.parse(localStorage.getItem('createdProperties') || '[]'));
            if (!properties.length) {
                setProperties(await fetchCreated());
            }
        };
    
        loadProperties();
    }, []);
    
    return (
        <div className="my-12">
          <Title text="Tus propiedades" />
    
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
}
