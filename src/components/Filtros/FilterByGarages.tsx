import React from 'react';

interface FilterByGaragesProps {
    onFilterChange: (hasGarages: boolean) => void;
    isChecked: boolean;
}

const FilterByGarages: React.FC<FilterByGaragesProps> = ({ onFilterChange, isChecked }) => {

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        onFilterChange(checked);
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2">
                <label className="flex items-center cursor-pointer">
                    <span className="mr-2 text-lg font-bold">Garage</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="garagesFilter"
                            checked={isChecked}
                            onChange={handleSwitchChange}
                            className="hidden"
                        />
                        <div className={`block w-14 h-8 rounded-full ${isChecked ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                        <div className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${isChecked ? 'bg-white transform translate-x-full' : 'bg-gray-300'}`}></div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default FilterByGarages;