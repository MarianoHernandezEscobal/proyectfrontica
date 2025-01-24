import React from "react";
import { FaRegEdit } from "react-icons/fa";

interface EditIconProps {
  clase?: string;
  size?: number;
}

const EditIcon: React.FC<EditIconProps> = ({ clase = "", size = 24 }) => {
  return (
    <FaRegEdit
      className={` ${clase}`}
      style={{ fontSize: size }}
    />
  );
};

export default EditIcon;