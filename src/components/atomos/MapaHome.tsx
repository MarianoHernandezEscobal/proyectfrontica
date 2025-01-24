// components/MapaHome.tsx
// import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Property } from '../../utils/types';

const MapaHome: React.FC<{ properties: Property[] }> = ({ properties }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'GOOGLE API KEY',
    });

    const center = { lat: -34.7565, lng: -54.3562 };

    const validProperties = properties.filter(property => property.geoCoordinates);

    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="w-full h-[400px]">
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={10}
            >
                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={{
                            lat: property.geoCoordinates?.lat || 0,
                            lng: property.geoCoordinates?.lng || 0,
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default MapaHome;
