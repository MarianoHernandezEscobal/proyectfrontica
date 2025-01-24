import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

interface DateInputProps {
    selectedYear: string;
    onChange: (year: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ selectedYear, onChange }) => {
    const handleDateChange = (date: Date | null) => {
        if (date) {
            onChange(date.getFullYear().toString());
        } else {
            onChange('');
        }
    };

    return (
        <div className="relative">
            <DatePicker
                selected={selectedYear ? new Date(parseInt(selectedYear), 0) : null}
                onChange={handleDateChange}
                customInput={
                    <button
                        type="button"
                        className="flex items-center border hover:border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                    >
                        <FaCalendarAlt className="text-gray-500" />
                        <span className=" ">
                            {selectedYear}
                        </span>
                    </button>
                }
                dateFormat="yyyy"
                showYearPicker
                yearDropdownItemNumber={15}
                scrollableYearDropdown
            />
        </div>
    );
};

export default DateInput;