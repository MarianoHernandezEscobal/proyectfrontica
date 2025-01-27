import React, { useEffect, useRef } from "react";
import { Property } from "../../utils/types";
import { DEFAULT_CENTER } from "../../utils/constants";

interface GoogleMapComponentProps {
  properties: Property[]; // Array de propiedades que recibe el componente
}


const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ properties }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Crear el mapa
    const map = new window.google.maps.Map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: 14,
    });

    // Ícono de marcador personalizado
    const centerMarkerIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="48" height="48">
              <path fill="#28a745" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
              <text x="50%" y="35%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="220" font-weight="bold" font-family="Arial, sans-serif">I</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(48, 48),
          anchor: new window.google.maps.Point(24, 48),
    };

    const houseMarkerIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg id="eB1GMz5vHKq1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="a0514980943e49baad3008a6eb235daf" export-id="a5f92edb59ba43efbf0cdd50c31faaa5" cached="false"><path d="M44.92,26.92L21.66,67.22c-1.041244,1.81171-1.038969,4.040804.005971,5.850385s2.97442,2.925812,5.064029,2.929615h46.54c2.097583.003896,4.037275-1.11366,5.085963-2.930285s1.046414-4.055225-.005963-5.869715L55.08,26.92c-1.045448-1.818068-2.98278-2.938836-5.08-2.938836s-4.034552,1.120768-5.08,2.938836Z" transform="matrix(4.055146 0 0-4.858811 97.199018 716.519944)" fill="#038c3e"/><circle r="27.5" transform="matrix(5.108887 0 0 4.900459 300.000004 300.000012)" fill="#038c3e"/><g transform="matrix(3.037085 0 0 2.57374 230.18726 240.838737)"><g><g><path d="M44.752,20.914L25.935,2.094c-.781-.781-1.842-1.22-2.946-1.22-1.105,0-2.166.439-2.947,1.22L1.221,20.914c-1.191,1.191-1.548,2.968-.903,4.525.646,1.557,2.165,2.557,3.85,2.557h2.404v13.461c0,2.013,1.607,3.642,3.621,3.642h3.203v-12.169c0-.927.766-1.651,1.692-1.651h6.223c.926,0,1.673.725,1.673,1.651v12.168h12.799c2.013,0,3.612-1.629,3.612-3.642v-13.46h2.411c1.685,0,3.204-1,3.85-2.557.644-1.557.288-3.333-.904-4.525Z" fill="#fff" stroke="#fff"/></g></g></g></svg>

      `)}`,
      scaledSize: new window.google.maps.Size(40, 40),
    };

    // Agregar marcador por defecto con InfoWindow
    const centerMarker = new window.google.maps.Marker({
      position: DEFAULT_CENTER,
      map,
      title: "Inmobiliaria Costa Azul",
      icon: centerMarkerIcon,
    });

    const welcomeInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="max-width: 250px; font-family: Arial, sans-serif; text-align: center;">
          <img src="../../assets/imgs/logo.png" alt="Inmobiliaria Costa Azul" style="border-radius: 50%; margin-bottom: 10px;" />
          <h3 style="font-size: 16px; color: #007BFF; margin: 0;">¡Bienvenido a Inmobiliaria Costa Azul!</h3>
          <p style="font-size: 14px; color: #333; margin: 10px 0;">Estamos aquí para ayudarte a encontrar tu hogar ideal. Explora nuestras propiedades.</p>
        </div>
      `,
    });

    // Abrir la ventana al cargar el mapa
    welcomeInfoWindow.open(map, centerMarker);

    // Mostrar InfoWindow al hacer clic en el marcador
    centerMarker.addListener("click", () => {
      welcomeInfoWindow.open(map, centerMarker);
    });

    // Agregar marcadores para las propiedades
    properties.forEach((property) => {
      if (property.geoCoordinates) {
        const marker = new window.google.maps.Marker({
          position: property.geoCoordinates,
          map,
          title: property.title,
          icon: houseMarkerIcon,
        });

        // Crear una InfoWindow con los detalles de la propiedad
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px; font-family: Arial, sans-serif; text-align: center;">
              <h3 style="font-size: 16px; margin: 0;">${property.title}</h3>
              <img src="${property.imageSrc[0]}" alt="${property.title}" style="width: 100%; height: auto; border-radius: 4px; margin: 8px 0;" />
              <p style="font-size: 18px; font-weight: bold; color: #28a745;">U$S ${property.price.toLocaleString("es-UY")}</p>
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

        // Mostrar la InfoWindow al hacer clic en el marcador
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    });
  }, [properties]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default GoogleMapComponent;
