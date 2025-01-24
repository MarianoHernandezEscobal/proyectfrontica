import React from "react";
import EditIcon from "../../assets/editIcon";


interface EditButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}


const EditButton: React.FC<EditButtonProps> = ({ onClick, className }) => {
  return (
    <button
      className={`py-2 px-3 transition duration-300 ${className} text-white hover:text-accent`}
      onClick={onClick}
    >
      <EditIcon clase="w-6 h-6" />
    </button>
  );
};

export default EditButton;
