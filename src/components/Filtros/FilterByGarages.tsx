interface FilterByGaragesProps {
    onFilterChange: (hasGarages: boolean) => void;
    isChecked: boolean;

}

const FilterByGarages: React.FC<FilterByGaragesProps> = ({ onFilterChange, isChecked }) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        onFilterChange(checked);
    };

    return (
        <div className="flex items-center justify-center h-full">

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="garagesFilter"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-green-600"
                />
                <label htmlFor="garagesFilter" className="text-lg font-bold">
                    Garages
                </label>
            </div>
        </div>
    );
};

export default FilterByGarages;