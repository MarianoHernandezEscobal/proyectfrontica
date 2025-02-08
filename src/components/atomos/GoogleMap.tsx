import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_CENTER } from "../../utils/constants";
import { Property } from "../../utils/types";

interface GoogleMapComponentProps {
  properties?: Property[];
  geoCoordinates?: google.maps.LatLngLiteral;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  properties,
  geoCoordinates
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: geoCoordinates || DEFAULT_CENTER,
          zoom: 14,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);


  useEffect(() => {
    if (!map) return;

    const centerMarkerIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="48" height="48">
          <path fill="#28a745" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(48, 48),
      anchor: new window.google.maps.Point(24, 48),
    };

    const centerMarker = new window.google.maps.Marker({
      position: DEFAULT_CENTER,
      map,
      title: "Inmobiliaria Costa Azul",
      icon: centerMarkerIcon,
    });

    const welcomeInfoWindow = new window.google.maps.InfoWindow({
      content: `
          <div 
            style="
              max-width: 250px; 
              font-family: Arial, sans-serif; 
              text-align: center; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center;
            "
          >
            <!-- Logo centrado -->
            <img 
              src="../../assets/imgs/logoColor.png" 
              alt="Inmobiliaria Costa Azul" 
              style="
                margin-bottom: 10px;
              " 
            />
            
            <!-- Título -->
            <h3 style="font-size: 14px; margin: 0; color: #007BFF;">
              ¡Bienvenido a Inmobiliaria Costa Azul!
            </h3>
      
            <!-- Descripción -->
            <p style="font-size: 12px; margin: 10px 0;">
              Estamos aquí para ayudarte a encontrar tu hogar ideal. 
              Explora nuestras propiedades.
            </p>
          </div>
        `,
    });


    welcomeInfoWindow.open(map, centerMarker);

    centerMarker.addListener("click", () => {
      welcomeInfoWindow.open(map, centerMarker);
    });

    const houseMarkerIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="48" height="48">
            <!-- Base del marcador (gota) -->
            <path fill="#28a745" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
            
            <!-- Casa blanca en el centro -->
            <path d="M192 150L130 200v80h40v-50h40v50h40v-80z" 
                  fill="#FFFFFF" stroke="#FFFFFF" stroke-width="10"/>
          </svg>
        `)}`,
      scaledSize: new window.google.maps.Size(48, 48), // Tamaño del icono
      anchor: new window.google.maps.Point(24, 48), // Ajuste para que el marcador toque el mapa correctamente
    };


    properties?.forEach((property) => {
      if (!property.geoCoordinates) return;

      const marker = new window.google.maps.Marker({
        position: property.geoCoordinates,
        map,
        title: property.title,
        icon: houseMarkerIcon,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 200px; font-family: Arial, sans-serif; text-align: center;">
            <h3 style="font-size: 16px; margin: 0;">${property.title}</h3>
            <img src="${property.imageSrc[0]}" alt="${property.title}"
                 style="width: 100%; height: auto; border-radius: 4px; margin: 8px 0;" />
            <p style="font-size: 18px; font-weight: bold; color: #28a745;">
              U$S ${property.price.toLocaleString("es-UY")}
            </p>
            <a href="/properties/${property.id}"
               style="
                 display: inline-block;
                 margin-top: 8px;
                 padding: 10px 20px;
                 background-color: #28a745;
                 color: white;
                 text-decoration: none;
                 font-size: 14px;
                 font-weight: bold;
                 border-radius: 5px;">
              Ver propiedad
            </a>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }, [map, properties]);

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", minHeight: "700px" }}
    />
  );
};

export default GoogleMapComponent;
