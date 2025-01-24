import { useState, useEffect } from 'react';
import PropertyCard from './atomos/PropertyCard';
import { Property } from '../utils/types';

interface CarouselProps {
    properties: Property[];
}

const Carousel: React.FC<CarouselProps> = ({ properties }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        const updatePageSize = () => {
            if (window.innerWidth < 768) {
                setPageSize(1);
            } else if (window.innerWidth < 1024) {
                setPageSize(2);
            } else {
                setPageSize(3);
            }
        };

        updatePageSize();
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    const pageCount = Math.ceil(properties.length / pageSize);

    useEffect(() => {
        const id = setTimeout(() => {
            const nextPage = (currentPage + 1) % pageCount;
            setCurrentPage(nextPage);
        }, 20000);
        return () => clearTimeout(id);
    }, [currentPage, pageCount]);

    const goToPreviousPage = () => {
        const previousPage = (currentPage - 1 + pageCount) % pageCount;
        setCurrentPage(previousPage);
    };

    const goToNextPage = () => {
        const nextPage = (currentPage + 1) % pageCount;
        setCurrentPage(nextPage);
    };

    const getPageProperties = () => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        return properties.slice(startIndex, endIndex);
    };

    return (
        <section className="overflow-hidden relative w-full py-4 px-6 bg-background-neutral rounded-lg">
            <div className="flex transition-transform duration-300 ease-in-out justify-center">
                {getPageProperties().map((property, index) => (
                    <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2">
                        <PropertyCard {...property} />
                    </div>
                ))}
            </div>

            <button onClick={goToPreviousPage} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
                &#10094;
            </button>
            <button onClick={goToNextPage} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
                &#10095;
            </button>
        </section>
    );
};

export default Carousel;