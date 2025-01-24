import React, { useState } from 'react';

interface MockMapProps {
    onClick: (latLng: { lat: number; lng: number }) => void;
}

const MockMap: React.FC<MockMapProps> = ({ onClick }) => {
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    const handleMapClick = () => {
        // Simula un clic en el mapa con coordenadas fijas
        const simulatedLatLng = { lat: -34.6500, lng: -54.1667 };
        setMarker(simulatedLatLng);
        onClick(simulatedLatLng);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
            onClick={handleMapClick}
        >
            <span>Mock Map (Click to select location)</span>
            {marker && (
                <div
                    style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                    }}
                />
            )}
        </div>
    );
};

export default MockMap;