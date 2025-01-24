import React, { useEffect, useState } from 'react';
import { Property } from '../utils/types';
import Title from '../components/atomos/Title';
import PropertyForm from '../components/FormPropiedades';

const PublicarProp: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onAddProperty = (newProperty: Omit<Property, 'id'>) => {
        const newId = properties.length + 1;
        const propertyWithId = { id: newId, ...newProperty };
        setProperties([...properties, propertyWithId]);
    };

    return (
        <div className="md:p-4 mx-10 ">
            <Title text="Publicar una nueva propiedad" size='large' />

            <div className='lg:max-w-[1300px] mx-auto'>
                <PropertyForm onAddProperty={onAddProperty} />
            </div>
        </div>
    );
};

export default PublicarProp;

