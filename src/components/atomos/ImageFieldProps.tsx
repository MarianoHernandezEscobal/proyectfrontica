import React from 'react';

interface ImageFieldProps {
    imageSrc: string[];
    onImageChange: (index: number, value: string) => void;
    addImageField: () => void;
    removeImageField: (index: number) => void;
    error?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({ imageSrc, onImageChange, addImageField, removeImageField, error }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Imágenes URL</label>
        {imageSrc.map((src, index) => (
            <div key={index} className="flex items-center mt-1">
                <input
                    type="text"
                    value={src}
                    onChange={(e) => onImageChange(index, e.target.value)}
                    className={`block w-full border ${error ? 'border-red-500' : 'border-gray-300'} pl-1 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    required
                    placeholder='https://www.ejemplo.com/image.jpg'
                />
                <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    disabled={imageSrc.length === 1}
                >
                    -
                </button>
            </div>
        ))}
        <button
            type="button"
            onClick={addImageField}
            className="mt-2 text-sm text-green-500 hover:text-green-700"
        >
            + agregar otra imagen
        </button>
        {error && (
            <div className="text-sm text-red-500 mt-1">
                {error}
            </div>
        )}
    </div>
);

export default ImageField;