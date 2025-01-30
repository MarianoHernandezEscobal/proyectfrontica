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
  /**
   * Verifica si una fecha está dentro de algún intervalo de renta existente
   */
  const isDateOccupied = (date: Date) => {
    return rents.some((rent) => {
      const rentCheckIn = parseISO(rent.checkIn);
      const rentCheckOut = parseISO(rent.checkOut);
      return isWithinInterval(date, { start: rentCheckIn, end: rentCheckOut });
    });
  };

  /**
   * Opcional: estilo para resaltar fechas ocupadas.
   * (Si quieres, puedes mantenerlo para que aparezcan de color distinto,
   * pero igualmente deshabilitadas. Ajusta el CSS con la clase .highlighted-date).
   */
  const dayClassName = (date: Date) => {
    return isDateOccupied(date) ? "highlighted-date" : "";
  };

  /**
   * Filtra fechas para deshabilitarlas en el calendario si:
   * - Están antes de 3 días atrás de la fecha actual
   * - Están dentro de un intervalo de renta existente
   */
  const filterDate = (date: Date) => {
    // Deshabilita si es menor a hoy - 3 días
    if (date < subDays(new Date(), 3)) {
      return false;
    }
    // Deshabilita si la fecha está ocupada
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
      // Aplica el filtro personalizado
      filterDate={filterDate}
      // Define la fecha mínima: hoy - 3 días
      minDate={subDays(new Date(), 3)}
      className={`${className} block w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500`}
      dateFormat={"dd/MM/yyyy"}
    />
  );
};

export default CustomDatePicker;
