// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// // interface FilterByRoomsProps {
// //     onFilterChange: (rooms: number[] | null) => void;
// //     currentFilters: number[] | null; // `null` para indicar "No Aplica"
// // }
// type FilterByRoomsProps = {
//     currentFilters: number[] | null;
//     onFilterChange: (rooms: number[] | null) => void;
// };
// const FilterByRooms: React.FC<FilterByRoomsProps> = ({ onFilterChange, currentFilters }) => {
//     const roomOptions = [1, 2, 3, 4];
//     const [isExpanded, setIsExpanded] = useState(false);

//     const isActive = (room: number) => currentFilters?.includes(room);

//     const handleRoomClick = (room: number) => {
//         if (currentFilters === null) {
//             onFilterChange([room]); // Si está en "No Aplica", reinicia los filtros
//         } else {
//             const updatedFilters = currentFilters.includes(room)
//                 ? currentFilters.filter((filter) => filter !== room) // Elimina si ya está seleccionado
//                 : [...currentFilters, room]; // Agrega si no está seleccionado

//             onFilterChange(updatedFilters.length > 0 ? updatedFilters : null); // Si no hay filtros, vuelve a "No Aplica"
//         }
//     };

//     const toggleExpand = () => {
//         setIsExpanded((prev) => !prev);
//     };

//     return (
//         <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-4">
//                 <p className="text-lg font-bold">Habitaciones</p>
//                 <button
//                     onClick={toggleExpand}
//                     className="text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                     {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//                 </button>
//             </div>
//             {isExpanded && (
//                 <div className="grid grid-cols-3 gap-2 mb-4">
//                     <button
//                         onClick={() => onFilterChange(null)} // "No Aplica"
//                         className={`flex items-center justify-center gap-2 p-2 rounded-md 
//                         ${currentFilters === null ? "bg-green-600" : "bg-gray-400"} 
//                         text-white hover:bg-green-500 focus:outline-none`}
//                     >
//                         No Aplica
//                     </button>
//                     {roomOptions.map((room) => (
//                         <button
//                             key={room}
//                             onClick={() => handleRoomClick(room)}
//                             className={`flex items-center justify-center gap-2 p-2 rounded-md 
//                             ${isActive(room) ? "bg-green-600" : "bg-gray-400"} 
//                             text-white hover:bg-green-500 focus:outline-none`}
//                         >
//                             {room === 4 ? "4+" : room}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FilterByRooms;
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterByRoomsProps = {
    currentFilters: number[] | null;
    onFilterChange: (rooms: number[] | null) => void;
};

const FilterByRooms: React.FC<FilterByRoomsProps> = ({ onFilterChange, currentFilters }) => {
    const roomOptions = [1, 2, 3, 4];
    const [isExpanded, setIsExpanded] = useState(false);

    const isActive = (room: number) => currentFilters?.includes(room);

    const handleRoomClick = (room: number) => {
        if (currentFilters === null) {
            onFilterChange([room]); // Si está en "No Aplica", reinicia los filtros
        } else {
            const updatedFilters = currentFilters.includes(room)
                ? currentFilters.filter((filter) => filter !== room) // Elimina si ya está seleccionado
                : [...currentFilters, room]; // Agrega si no está seleccionado

            onFilterChange(updatedFilters.length > 0 ? updatedFilters : null); // Si no hay filtros, vuelve a "No Aplica"
        }
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="text-left"> {/* Alineación a la izquierda */}
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
                        onClick={() => onFilterChange(null)} // "No Aplica"
                        className={`flex items-center gap-2 p-1 cursor-pointer 
                        ${currentFilters === null ? "text-green-600" : "text-gray-600"} 
                        hover:text-green-500`}
                    >
                        <span>No Aplica</span>
                    </div>
                    {roomOptions.map((room) => (
                        <div
                            key={room}
                            onClick={() => handleRoomClick(room)}
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