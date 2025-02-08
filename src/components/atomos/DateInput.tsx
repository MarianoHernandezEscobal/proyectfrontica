import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWithinInterval, parseISO, subDays } from "date-fns";
import { Rent } from "../../utils/types";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  rents: Rent[];
  placeholderText: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  rents,
  placeholderText,
  className,
}) => {

  const isDateOccupied = (date: Date) => {
    return rents.some((rent) => {
      const rentCheckIn = parseISO(rent.checkIn);
      const rentCheckOut = parseISO(rent.checkOut);
      return isWithinInterval(date, { start: rentCheckIn, end: rentCheckOut });
    });
  };


  const dayClassName = (date: Date) => {
    return isDateOccupied(date) ? "highlighted-date" : "";
  };


  const filterDate = (date: Date) => {
    if (date < subDays(new Date(), 3)) {
      return false;
    }
    if (isDateOccupied(date)) {
      return false;
    }
    return true;
  };

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      dayClassName={dayClassName}
      filterDate={filterDate}
      minDate={subDays(new Date(), 3)}
      className={`${className} block w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500`}
      dateFormat={"dd/MM/yyyy"}
    />
  );
};

export default CustomDatePicker;
