import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_CENTER } from "../../utils/constants";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface GoogleMapSelectorProps {
  formData: { geoCoordinates: { lat: number; lng: number } };
  onFormChange: (lat: number, lng: number) => void;
}

const GoogleMapSelector: React.FC<GoogleMapSelectorProps> = ({ formData, onFormChange }) => {
  const [map, setMap] = useState<google.maps.Map>()
  const mapRef = useRef<HTMLDivElement>()

  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{ lat: number, lng: number } | undefined>()

  const markerIcon = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="48" height="48">
            <path fill="#007BFF" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
            <circle cx="192" cy="192" r="50" fill="#FFFFFF"/>
          </svg>
        `)}`,
    scaledSize: new window.google.maps.Size(48, 48),
    anchor: new window.google.maps.Point(24, 48),
  };
  useEffect(() => {
    if (mapRef.current && !map) {
      const initialPosition =
        formData.geoCoordinates.lat !== 0 && formData.geoCoordinates.lng !== 0
          ? formData.geoCoordinates
          : DEFAULT_CENTER;

      setMap(new window.google.maps.Map(mapRef.current, {
        center: initialPosition,
        zoom: 10,
      }))
    }
    if (map && !markerCluster) {
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const { lat, lng } = e.latLng
          setMarker({ lat: lat(), lng: lng() })
        }
      })
      setMarkerClusters(new MarkerClusterer({
        map, markers: [],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markerCluster])

  markerCluster?.clearMarkers();
  useEffect(() => {
    if (marker && markerCluster) {
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: markerIcon,
        })
      )
      onFormChange(marker.lat, marker.lng)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker, markerCluster])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div ref={mapRef as any} style={{ width: "100%", height: "500px" }} />;
};

export default GoogleMapSelector;
