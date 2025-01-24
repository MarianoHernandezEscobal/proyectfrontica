import { TextareaFieldProps } from "../../utils/types";

const TextareaField: React.FC<TextareaFieldProps> = ({ label, value, onChange, name, error, maxLength, rows = 4 }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                name={name}
                maxLength={maxLength}
                className={`p-4 mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                rows={rows}
                style={{ resize: 'none' }}
            />
            {maxLength && (
                <div className="text-sm text-gray-500 mt-1">
                    {maxLength - value.length} caracteres restantes
                </div>
            )}
            {error && (
                <div className="text-sm text-red-500 mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextareaField;