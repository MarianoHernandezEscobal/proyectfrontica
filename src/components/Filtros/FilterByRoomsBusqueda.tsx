import React, { useState } from "react";
// @ts-expect-error asdasd
import Modal from "react-modal";
import { FaChevronDown } from "react-icons/fa";

Modal.setAppElement("#root");

type FilterByRoomsProps = {
    currentFilters: number[] | null;
    onFilterChange: (rooms: number[] | string) => void;
    handleRoomChange: (room: number | "NoAplica") => void;
};

const FilterByRoomsBusqueda: React.FC<FilterByRoomsProps> = ({
    currentFilters,
    handleRoomChange,
}) => {
    const roomOptions = [1, 2, 3, 4];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = (room: number) => currentFilters?.includes(room);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="text-left">
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold px-1">Habitaciones</p>
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
                contentLabel="Seleccionar Habitaciones"
            >
                <div className="bg-white p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col mb-4">
                        <div
                            onClick={() => handleRoomChange("NoAplica")}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${currentFilters === null ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span>No Aplica</span>
                        </div>
                        {roomOptions.map((room) => (
                            <div
                                key={room}
                                onClick={() => {
                                    handleRoomChange(room);
                                    toggleModal();
                                }}
                                className={`flex items-center gap-2 p-1 cursor-pointer 
                                ${isActive(room) ? "text-green-600" : "text-gray-600"} 
                                hover:text-green-500`}
                            >
                                <span>{room === 4 ? "4+" : room}</span>
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

export default FilterByRoomsBusqueda;