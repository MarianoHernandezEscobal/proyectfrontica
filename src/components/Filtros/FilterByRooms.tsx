

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterByRoomsProps = {
    currentFilters: number[] | null;
    onFilterChange: (rooms: number[] | string) => void;
    handleRoomChange: (room: number | "NoAplica") => void;
};

const FilterByRooms: React.FC<FilterByRoomsProps> = ({ currentFilters, handleRoomChange }) => {
    const roomOptions = [1, 2, 3, 4];
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (room: number) => currentFilters?.includes(room);

    const toggleExpand = () => setIsExpanded((prev) => !prev);

    return (
        <div className="text-left">
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">Habitaciones</p>
                <button
                    onClick={toggleExpand}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isExpanded && (
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
                            onClick={() => handleRoomChange(room)}
                            className={`flex items-center gap-2 p-1 cursor-pointer 
                            ${isActive(room) ? "text-green-600" : "text-gray-600"} 
                            hover:text-green-500`}
                        >
                            <span>{room === 4 ? "4+" : room}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterByRooms;
