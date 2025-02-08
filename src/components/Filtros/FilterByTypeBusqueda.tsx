import React, { useState } from "react";
// @ts-expect-error asdasd
import Modal from "react-modal";
import {
    FaHome,
    FaBuilding,
    FaWarehouse,
    FaStore,
    FaEllipsisH,
    FaChevronDown,
    FaTree,
} from "react-icons/fa";
import { MdBusiness } from "react-icons/md";

Modal.setAppElement("#root");

interface FilterByTypeProps {
    onFilterChange: (type: string) => void;
    currentFilters: string[];
}

const iconMap = {
    apartment: <FaBuilding />,
    warehouse: <FaWarehouse />,
    house: <FaHome />,
    store: <FaStore />,
    office: <MdBusiness />,
    land: <FaTree />,
    other: <FaEllipsisH />,
};

const typeLabels = {
    apartment: "Apartamento",
    warehouse: "Almacen",
    house: "Casa",
    store: "Comercio",
    office: "Oficina",
    land: "Terreno",
    other: "Otro",
};

const FilterByTypeBusqueda: React.FC<FilterByTypeProps> = ({ onFilterChange, currentFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = (type: string) => currentFilters.includes(type);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="text-left">
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold px-1">Tipo</p>
                <button
                    onClick={toggleModal}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <FaChevronDown />
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                shouldCloseOnOverlayClick={true}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                contentLabel="Seleccionar Tipo"
            >
                <div className="bg-white p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col ">
                        <div
                            onClick={() => {
                                onFilterChange("allTypes");
                                toggleModal();
                            }}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${currentFilters.length === 0 ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span className="md:text-base sm:text-lg">Todos los tipos</span>
                        </div>
                        {Object.keys(iconMap).map((type) => (
                            <div
                                key={type}
                                onClick={() => {
                                    onFilterChange(type);
                                    toggleModal();
                                }}
                                className={`flex items-center gap-2 p-1 cursor-pointer 
                                ${isActive(type) ? "text-green-600" : "text-gray-600"} 
                                hover:text-green-500`}
                            >
                                {iconMap[type as keyof typeof iconMap]}
                                <span className="capitalize md:text-base sm:text-lg">{typeLabels[type as keyof typeof typeLabels]}</span>
                            </div>
                        ))}
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

export default FilterByTypeBusqueda;