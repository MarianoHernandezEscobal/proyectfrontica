import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex] = useState(0);
  const maxVisibleThumbnails = 10;

  const openModal = (image: string) => {
    const index = images.indexOf(image);
    setCurrentIndex(index);
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (isModalOpen) {
      setSelectedImage(images[currentIndex]);
    }
  }, [currentIndex, isModalOpen, images]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (event.key === "ArrowLeft") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="property-detail-slider-wrapper clearfix w-full overflow-hidden">
      <div
        className="property-detail-slider-two flex overflow-hidden justify-center relative"
        style={{ height: "75vh" }}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-auto h-full object-contain"
          draggable="false"
          onClick={() => openModal(images[currentIndex])}
        />
        <button
          onClick={prevImage}
          className="absolute left-1 md:left-20 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-40 text-text-light p-2 rounded-full hover:bg-opacity-70"
        >
          <FaChevronLeft className="w-4 h-4 text-text-light" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-1 md:right-20 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-40 text-text-light p-2 rounded-full hover:bg-opacity-70"
        >
          <FaChevronRight className="w-4 h-4 text-text-light" />
        </button>
      </div>
      <div className="property-detail-slider-carousel-nav flex justify-center items-center mt-4">
        <ul className="slides flex overflow-x-auto">
          {images
            .slice(startIndex, startIndex + maxVisibleThumbnails)
            .map((image, index) => (
              <li
                key={index + startIndex}
                className={`flex-none w-20 mr-2 cursor-pointer ${
                  index + startIndex === currentIndex
                    ? "border-2 border-secondary-dark"
                    : ""
                }`}
                onClick={() => {
                  setCurrentIndex(index + startIndex);
                  openModal(image);
                }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover"
                  draggable="false"
                />
              </li>
            ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-background-dark bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-0 right-0 m-4 text-text-light text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-40 text-text-light p-2 rounded-full hover:bg-opacity-70"
            >
              <FaChevronLeft className="w-4 h-4 text-text-light" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-40 text-text-light p-2 rounded-full hover:bg-opacity-70"
            >
              <FaChevronRight className="w-4 h-4 text-text-light" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
