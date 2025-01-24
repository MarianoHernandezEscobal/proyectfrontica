import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import { Navigation, A11y } from "swiper/modules";
import {
  FaBed,
  FaBath,
  FaCar,
  FaSwimmingPool,
  FaRulerCombined,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

interface PropertyFeaturesProps {
  property: {
    rooms?: number;
    bathrooms?: number;
    garages?: boolean;
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
    { icon: FaCar, label: "Garage", value: property.garages ? "Sí" : "No" },
    { icon: FaSwimmingPool, label: "Piscina", value: property.pool ? "Sí" : "No" },
    { icon: FaRulerCombined, label: "Área", value: property.area ? `${property.area} m²` : undefined },
    { icon: FaRulerCombined, label: "Lote", value: property.lotSize ? `${property.lotSize} m²` : undefined },
    { icon: FaCalendarAlt, label: "Año de construcción", value: property.yearBuilt },
  ].filter((f) => f.value !== undefined);

  const [slidesToShow, setSlidesToShow] = useState(1);
  const swiperRef = useRef<SwiperType>();

  // Función para determinar cuántos slides mostrar según el ancho de pantalla
  const updateSlidesToShow = () => {
    const width = window.innerWidth;
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
    <div className="relative w-full max-w-4xl mx-auto rounded-lg p-4">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 transform hover:bg-primary-light hover:text-text-light hover:shadow-md hover:rounded-full -translate-y-1/2 p-2 z-10"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={slidesToShow}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg">
                <Icon className="text-primary text-3xl mb-2" />
                <span className="text-sm font-medium text-text-primary">{feature.label}</span>
                <span className="text-sm font-semibold text-text-dark">{feature.value}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 transform hover:bg-primary-light hover:text-text-light text-text-dark hover:shadow-md hover:rounded-full -translate-y-1/2 p-2 z-10"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PropertyFeatures;
