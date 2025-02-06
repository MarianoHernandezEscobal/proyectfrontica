import React, { useState } from "react";
// @ts-expect-error asdasd
import Modal from "react-modal";
import { Barrios } from "../../assets/barrios";
import { FaChevronDown } from "react-icons/fa";

// Establecer el elemento raíz para el modal
Modal.setAppElement("#root");

interface FilterByHoodProps {
    onFilterChange: (neighborhood: string) => void;
    currentFilters: string[];
}

const FilterByHoodBusqueda: React.FC<FilterByHoodProps> = ({ onFilterChange, currentFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = (neighborhood: string) => {
        if (neighborhood === "Cualquiera") {
            return currentFilters.length === 0 || currentFilters.includes("Cualquiera");
        }
        return currentFilters.includes(neighborhood);
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleItemClick = (neighborhood: string) => {
        if (neighborhood === "Cualquiera" && currentFilters.includes("Cualquiera")) {
            // Si "Cualquiera" ya está seleccionado, lo deseleccionamos.
            onFilterChange("");
        } else {
            onFilterChange(neighborhood);
        }
        toggleModal(); // Cierra el modal después de seleccionar
    };

    return (
        <div className="text-left">
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold px-1">Barrio</p>
                <button
                    onClick={toggleModal}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <FaChevronDown />
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal} // Cierra el modal al presionar Esc o hacer clic fuera
                shouldCloseOnOverlayClick={true} // Cierra el modal al hacer clic en el fondo
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                contentLabel="Seleccionar Barrio"
            >
                <div className="bg-white p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col mb-4">
                        <div
                            onClick={() => handleItemClick("Cualquiera")}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${isActive("Cualquiera") ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span>Todos los barrios</span>
                        </div>
                        {Barrios.filter(barrio => barrio.label !== "Cualquiera").map((barrio) => (
                            <div
                                key={barrio.label}
                                onClick={() => handleItemClick(barrio.value)}
                                className={`flex items-center gap-2 p-1 cursor-pointer 
                                ${isActive(barrio.value) ? "text-green-600" : "text-gray-600"} 
                                hover:text-green-500`}
                            >
                                <span className="md:text-base sm:text-lg">{barrio.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={toggleModal} className="mt-4 p-2 bg-accent-light hover:bg-accent-dark text-white rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FilterByHoodBusqueda;