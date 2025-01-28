import React, { useEffect, useRef } from "react";
import { DEFAULT_CENTER } from "../../utils/constants";

interface GoogleMapSelectorProps {
  formData: { geoCoordinates: { lat: number; lng: number } };
  onFormChange: (lat: number, lng: number) => void;
}

const GoogleMapSelector: React.FC<GoogleMapSelectorProps> = ({
  formData,
  onFormChange,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Crear el mapa solo si no existe ya
    if (!googleMapRef.current) {
      const defaultCenter = formData.geoCoordinates.lng !== 0 ? formData.geoCoordinates : DEFAULT_CENTER;

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 14,
      });

      // Crear un marcador en las coordenadas iniciales
      if (formData.geoCoordinates.lat !== 0 && formData.geoCoordinates.lng !== 0) {
        markerRef.current = new window.google.maps.Marker({
          position: formData.geoCoordinates,
          map: googleMapRef.current,
        });
      }

      googleMapRef.current.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          // Mover el marcador si ya existe
          if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
          } else {
            // Crear un nuevo marcador
            const marker = new window.google.maps.Marker({
              position: { lat, lng },
              map: googleMapRef.current,
            });
            markerRef.current = marker;
          }

          // Actualizar el objeto formData a través del prop onFormChange
          onFormChange(lat, lng);
        }
      });
    }
  }, [onFormChange, formData.geoCoordinates]);

  useEffect(() => {
    if (googleMapRef.current) {
      // Centrar el mapa en las coordenadas actuales
      googleMapRef.current.setCenter(formData.geoCoordinates);

      // Mover el marcador si ya existe
      if (markerRef.current) {
        markerRef.current.setPosition(formData.geoCoordinates);
      } else {
        // Crear un nuevo marcador en las coordenadas actuales
        const marker = new window.google.maps.Marker({
          position: formData.geoCoordinates,
          map: googleMapRef.current,
        });
        markerRef.current = marker;
      }
    }
  }, [formData.geoCoordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default GoogleMapSelector;