// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper as SwiperType } from 'swiper';
// import { Navigation, A11y } from "swiper/modules";
// import {
//   FaBed,
//   FaBath,
//   FaCar,
//   FaSwimmingPool,
//   FaRulerCombined,
//   FaCalendarAlt,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/scrollbar";

// interface PropertyFeaturesProps {
//   property: {
//     rooms?: number;
//     bathrooms?: number;
//     garages?: boolean;
//     pool?: boolean;
//     area?: number;
//     lotSize?: number;
//     yearBuilt?: string;
//   };
// }

// const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ property }) => {
//   const features = [
//     { icon: FaBed, label: "Dormitorios", value: property.rooms },
//     { icon: FaBath, label: "Baños", value: property.bathrooms },
//     { icon: FaCar, label: "Garage", value: property.garages ? "Sí" : "No" },
//     { icon: FaSwimmingPool, label: "Piscina", value: property.pool ? "Sí" : "No" },
//     { icon: FaRulerCombined, label: "Área", value: property.area ? `${property.area} m²` : undefined },
//     { icon: FaRulerCombined, label: "Lote", value: property.lotSize ? `${property.lotSize} m²` : undefined },
//     { icon: FaCalendarAlt, label: "Año de construcción", value: property.yearBuilt },
//   ].filter((f) => f.value !== undefined);

//   const [slidesToShow, setSlidesToShow] = useState(1);
//   const swiperRef = useRef<SwiperType>();

//   // Función para determinar cuántos slides mostrar según el ancho de pantalla
//   const updateSlidesToShow = () => {
//     const width = window.innerWidth;
//     if (width >= 1440) setSlidesToShow(8);
//     else if (width >= 1024) setSlidesToShow(5);
//     else if (width >= 640) setSlidesToShow(3);
//     else setSlidesToShow(2);
//   };

//   useEffect(() => {
//     updateSlidesToShow();
//     window.addEventListener("resize", updateSlidesToShow);
//     return () => window.removeEventListener("resize", updateSlidesToShow);
//   }, []);

//   return (
//     <div className="relative w-full max-w-4xl mx-auto rounded-lg p-4">
//       <button
//         onClick={() => swiperRef.current?.slidePrev()}
//         className="absolute left-0 top-1/2 transform hover:bg-primary-light hover:text-text-light hover:shadow-md hover:rounded-full -translate-y-1/2 p-2 z-10"
//       >
//         <FaChevronLeft className="w-5 h-5" />
//       </button>

//       <Swiper
//         modules={[Navigation, A11y]}
//         // spaceBetween={10}
//         slidesPerView={slidesToShow}
//         onBeforeInit={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//         className="w-full h-auto"
//       >
//         {features.map((feature, i) => {
//           const Icon = feature.icon;
//           return (
//             <SwiperSlide key={i} className="flex items-center justify-center h-full">
//               <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg">
//                 <Icon className="text-primary text-3xl mb-2" />
//                 <span className="text-sm font-medium text-text-primary">{feature.label}</span>
//                 <span className="text-sm font-semibold text-text-dark">{feature.value}</span>
//               </div>
//             </SwiperSlide>

//           );
//         })}
//       </Swiper>

//       <button
//         onClick={() => swiperRef.current?.slideNext()}
//         className="absolute right-0 top-1/2 transform hover:bg-primary-light hover:text-text-light text-text-dark hover:shadow-md hover:rounded-full -translate-y-1/2 p-2 z-10"
//       >
//         <FaChevronRight className="w-5 h-5" />
//       </button>
//     </div>
//   );
// };

// export default PropertyFeatures;
import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaSwimmingPool,
  FaRulerCombined,
  FaCalendarAlt,
  // FaChevronLeft,
  // FaChevronRight,
} from "react-icons/fa";

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
    { icon: FaCalendarAlt, label: "Construido", value: property.yearBuilt },
  ].filter((f) => f.value !== undefined);

  // const [currentIndex, setCurrentIndex] = useState(0);
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

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : features.length - slidesToShow
  //   );
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex < features.length - slidesToShow ? prevIndex + 1 : 0
  //   );
  // };

  return (
    <div className="relative w-full  max-w-4xl mx-auto p-4">
      {/* Botones de navegación: ocultos en móviles */}
      {/* {!isMobile && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 hover:bg-primary-light hover:text-white rounded-full hidden md:block"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10 hover:bg-primary-light hover:text-white rounded-full hidden md:block"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </>
      )} */}

      {/* Contenedor de características */}
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
