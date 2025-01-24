import React from 'react';
import { MdOutlineDelete } from "react-icons/md";

interface ImagePreviewProps {
  src: string;
  onDelete: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, onDelete }) => {
  return (
    <div className="relative group">
      <img
        src={src || "/placeholder.svg"}
        alt="Property preview"
        className="w-full h-24 object-cover rounded-md transition-opacity group-hover:opacity-75"
      />
      <button
        onClick={onDelete}
        className="absolute top-1 right-1 bg-error text-text-light rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete image"
      >
        <MdOutlineDelete size={16} />
      </button>
    </div>
  );
};

export default ImagePreview;

