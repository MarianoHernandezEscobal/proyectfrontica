import React from "react";
import HeartIcon from "../../assets/heartIcon";

interface FavButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isFavourite: boolean;
  className?: string;
}

const FavButton: React.FC<FavButtonProps> = ({ onClick, isFavourite, className }) => {
  return (
    <button
      className={`py-2 px-3 transition duration-300 rounded-md ${className} ${
        isFavourite
          ? "text-status-error border-status-error"
          : "text-text-light border-background-dark hover:text-status-error"
      }`}
      onClick={onClick}
    >
      <HeartIcon clase="w-6 h-6" />
    </button>
  );
};

export default FavButton;
