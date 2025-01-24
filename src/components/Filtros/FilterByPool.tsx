
interface FilterByPoolProps {
    onFilterChange: (hasPool: boolean) => void;
    isChecked: boolean;
}



const FilterByPool: React.FC<FilterByPoolProps> = ({ onFilterChange, isChecked }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        onFilterChange(checked);
    };

    return (
        <div className="flex items-center justify-center h-full">

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="poolFilter"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-green-600"
                />
                <label htmlFor="poolFilter" className="text-lg font-bold">
                    Piscina
                </label>
            </div>
        </div>
    );
};

export default FilterByPool;