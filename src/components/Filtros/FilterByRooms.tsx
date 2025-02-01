
// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// type FilterByRoomsProps = {
//     currentFilters: number[] | null;
//     onFilterChange: (rooms: number[] | null) => void;
// };

// const FilterByRooms: React.FC<FilterByRoomsProps> = ({ onFilterChange, currentFilters }) => {
//     const roomOptions = [1, 2, 3, 4];
//     const [isExpanded, setIsExpanded] = useState(false);

//     const isActive = (room: number) => currentFilters?.includes(room);

//     // const handleRoomClick = (room: number) => {
//     //     if (currentFilters === null) {
//     //         onFilterChange([room]); // Si está en "No Aplica", reinicia los filtros
//     //     } else {
//     //         const updatedFilters = currentFilters.includes(room)
//     //             ? currentFilters.filter((filter) => filter !== room) // Elimina si ya está seleccionado
//     //             : [...currentFilters, room]; // Agrega si no está seleccionado

//     //         onFilterChange(updatedFilters.length > 0 ? updatedFilters : null); // Si no hay filtros, vuelve a "No Aplica"
//     //     }
//     // };

//     const toggleExpand = () => {
//         setIsExpanded((prev) => !prev);
//     };

//     return (
//         <div className="text-left"> {/* Alineación a la izquierda */}
//             <div className="flex items-center justify-between mb-4">
//                 <p className="text-lg font-bold">Habitaciones</p>
//                 <button
//                     onClick={toggleExpand}
//                     className="text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                     {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//                 </button>
//             </div>
//             {isExpanded && (
//                 <div className="flex flex-col mb-4">
//                     <div
//                         onClick={() => onFilterChange(null)} // "No Aplica"
//                         className={`flex items-center gap-2 p-1 cursor-pointer 
//                         ${currentFilters === null ? "text-green-600" : "text-gray-600"} 
//                         hover:text-green-500`}
//                     >
//                         <span>No Aplica</span>
//                     </div>
//                     {roomOptions.map((room) => (
//                         <div
//                             key={room}
//                             onClick={() => onFilterChange(room)}
//                             className={`flex items-center gap-2 p-1 cursor-pointer 
//                             ${isActive(room) ? "text-green-600" : "text-gray-600"} 
//                             hover:text-green-500`}
//                         >
//                             <span>{room === 4 ? "4+" : room}</span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FilterByRooms;



// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// type FilterByRoomsProps = {
//     currentFilters: number[] | null;
//     onFilterChange: (rooms: number[] | null) => void;
// };

// const FilterByRooms: React.FC<FilterByRoomsProps> = ({ onFilterChange, currentFilters }) => {
//     const roomOptions = [1, 2, 3, 4];
//     const [isExpanded, setIsExpanded] = useState(false);

//     // Función para verificar si la habitación está activa
//     const isActive = (room: number) => currentFilters?.includes(room);

//     // Función para alternar la expansión del filtro
//     const toggleExpand = () => {
//         setIsExpanded((prev) => !prev);
//     };

//     // Manejar el clic en una habitación
//     const handleRoomClick = (room: number) => {
//         if (currentFilters === null) {
//             // Si está en "No Aplica", reinicia los filtros con la habitación seleccionada
//             onFilterChange([room]);
//         } else {
//             if (currentFilters.includes(room)) {
//                 // Si ya está seleccionado, lo eliminamos
//                 const updatedFilters = currentFilters.filter((filter) => filter !== room);
//                 onFilterChange(updatedFilters.length > 0 ? updatedFilters : null); // Si no hay filtros, volvemos a "No Aplica"
//             } else {
//                 // Si no está seleccionado, lo agregamos
//                 onFilterChange([...currentFilters, room]);
//             }
//         }
//     };
//     const handleNoApplyClick = () => {
//         onFilterChange(null); // Limpia todos los filtros
//     };

//     return (
//         <div className="text-left"> {/* Alineación a la izquierda */}
//             <div className="flex items-center justify-between mb-4">
//                 <p className="text-lg font-bold">Habitaciones</p>
//                 <button
//                     onClick={toggleExpand}
//                     className="text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                     {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//                 </button>
//             </div>
//             {isExpanded && (
//                 <div className="flex flex-col mb-4">
//                     <div
//                         onClick={handleNoApplyClick} // "No Aplica"
//                         className={`flex items-center gap-2 p-1 cursor-pointer 
//                         ${currentFilters === null ? "text-green-600" : "text-gray-600"} 
//                         hover:text-green-500`}
//                     >
//                         <span>No Aplica</span>
//                     </div>
//                     {roomOptions.map((room) => (
//                         <div
//                             key={room}
//                             onClick={() => handleRoomClick(room)} // Llamamos a handleRoomClick
//                             className={`flex items-center gap-2 p-1 cursor-pointer 
//                             ${isActive(room) ? "text-green-600" : "text-gray-600"} 
//                             hover:text-green-500`}
//                         >
//                             <span>{room === 4 ? "4+" : room}</span>
//                         </div>
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
    onFilterChange: (rooms: number[] | string) => void;
};

const FilterByRooms: React.FC<FilterByRoomsProps> = ({ onFilterChange, currentFilters }) => {
    const roomOptions = [1, 2, 3, 4];
    const [isExpanded, setIsExpanded] = useState(false);

    // Función para verificar si la habitación está activa
    const isActive = (room: number) => currentFilters?.includes(room);

    // Función para alternar la expansión del filtro
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
                        onClick={() => onFilterChange("NoAplica")} // "No Aplica"
                        className={`flex items-center gap-2 p-1 cursor-pointer 
                        ${currentFilters === null ? "text-green-600" : "text-gray-600"} 
                        hover:text-green-500`}
                    >
                        <span>No Aplica</span>
                    </div>
                    {roomOptions.map((room) => (
                        <div
                            key={room}
                            onClick={() => onFilterChange(isActive(room) ? currentFilters?.filter(r => r !== room) : [...(currentFilters || []), room])}
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
