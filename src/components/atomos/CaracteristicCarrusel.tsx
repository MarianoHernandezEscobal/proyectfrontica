
import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaSwimmingPool,
  FaRulerCombined,
  FaCalendarAlt,
} from "react-icons/fa";

interface PropertyFeaturesProps {
  property: {
    rooms?: number;
    bathrooms?: number;
    garage?: boolean;
    pool?: boolean;
    area?: number;
    lotSize?: number;
    yearBuilt?: string;
  };
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ property }) => {
  const features = [
    { icon: FaBed, label: "Dormitorios", value: property.rooms },
    { icon: FaBath, label: "Baños", value: property.bathrooms },
    { icon: FaCar, label: "Garage", value: property.garage ? "Sí" : "No" },
    { icon: FaSwimmingPool, label: "Piscina", value: property.pool ? "Sí" : "No" },
    { icon: FaRulerCombined, label: "Área", value: property.area ? `${property.area} m²` : undefined },
    { icon: FaRulerCombined, label: "Lote", value: property.lotSize ? `${property.lotSize} m²` : undefined },
    { icon: FaCalendarAlt, label: "Construido", value: property.yearBuilt },
  ].filter((f) => f.value !== undefined);

  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Determinar cuántos slides mostrar según el ancho de pantalla
  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    setIsMobile(width < 640);
    if (width >= 1440) setSlidesToShow(8);
    else if (width >= 1024) setSlidesToShow(5);
    else if (width >= 640) setSlidesToShow(3);
    else setSlidesToShow(2);
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  return (
    <div className="relative w-full  max-w-4xl mx-auto p-4">

      <div
        className={`flex ${isMobile ? "flex-wrap justify-center gap-4" : "overflow-hidden flex justify-center"
          }`}
      >
        {!isMobile ? (
          <div
            className="flex justify-between transition-transform duration-300"
            style={{
              // transform: `translateX(-${(currentIndex / features.length) * 100}%)`,
              width: `${(100 / slidesToShow) * features.length}%`,
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center p-4"
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  <Icon className="text-accent-light text-3xl mb-2" />
                  <span className="text-sm font-medium text-text-primary">{feature.label}</span>
                  <span className="text-sm font-semibold text-text-dark">{feature.value}</span>
                </div>
              );
            })}
          </div>
        ) : (
          features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center p-4 w-32"
              >
                <Icon className="text-accent-light text-3xl mb-2" />
                <span className="text-sm font-medium text-text-primary">{feature.label}</span>
                <span className="text-sm font-semibold text-text-dark">{feature.value}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PropertyFeatures;
