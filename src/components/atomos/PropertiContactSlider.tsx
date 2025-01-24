import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y } from "swiper/modules";
import ContactForm from "./ContactForm";
import RentalModal from "./RentForm";
import "swiper/css";
import "swiper/css/scrollbar";

interface PropertyContactSliderProps {
  propertyId: number;
  isRent: boolean;
}

const PropertyContactSlider: React.FC<PropertyContactSliderProps> = ({ propertyId, isRent }) => {

  return (
    <div className="w-full max-w-lg bg-white  shadow-md">
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className="w-full"
      >
        <SwiperSlide>
          <ContactForm propertyId={propertyId} isRent={isRent} />
        </SwiperSlide>
        { isRent && (        <SwiperSlide>
          <RentalModal propertyId={propertyId} />
        </SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default PropertyContactSlider;
