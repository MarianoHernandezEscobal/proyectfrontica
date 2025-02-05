import React, { useState } from "react";
// @ts-expect-error importando Modal
import Modal from "react-modal";
import { FaChevronDown } from "react-icons/fa";
import { PropertyStatus } from "../../utils/types";
import Title from "../atomos/Title";

// Establecer el elemento raíz para el modal
Modal.setAppElement("#root");

interface FilterByStatusButtonsProps {
    onFilterChange: (status: string) => void;
    currentFilters: string[];
}

const statusLabels: Record<PropertyStatus, string> = {
    [PropertyStatus.ForSale]: "En Venta",
    [PropertyStatus.ForRent]: "En Alquiler",
    [PropertyStatus.Sold]: "Vendido",
    [PropertyStatus.Rented]: "Alquilado",
    [PropertyStatus.UnderConstruction]: "En Construcción",
    [PropertyStatus.Reserved]: "Reservado",
};

const FilterByStatusBusqueda: React.FC<FilterByStatusButtonsProps> = ({
    onFilterChange,
    currentFilters,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = (status: string) => currentFilters.includes(status);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="text-left">
            <div className="flex items-center justify-between ">
                <p className="text-lg font-bold px-1">Estado</p>
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
                contentLabel="Seleccionar Estado"
            >
                <div className="bg-white p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
                    <Title text="Seleccionar Estado" />
                    <div className="flex flex-col ">
                        <div
                            onClick={() => {
                                onFilterChange("allStatus");
                                toggleModal();
                            }}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${currentFilters.length === 0 ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span className="md:text-base sm:text-lg">Todos los estados</span>
                        </div>
                        {Object.keys(PropertyStatus).map((key) => {
                            const status = PropertyStatus[key as keyof typeof PropertyStatus];
                            return (
                                <div
                                    key={status}
                                    onClick={() => {
                                        onFilterChange(status);
                                        toggleModal();
                                    }}
                                    className={`flex items-center gap-2 p-1 cursor-pointer 
                                    ${isActive(status) ? "text-green-600" : "text-gray-600"} 
                                    hover:text-green-500`}
                                >
                                    <span className="capitalize md:text-base sm:text-lg">{statusLabels[status]}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end ">
                        <button onClick={toggleModal} className="mt-4 p-2 bg-accent-light hover:bg-accent-dark text-white rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FilterByStatusBusqueda;