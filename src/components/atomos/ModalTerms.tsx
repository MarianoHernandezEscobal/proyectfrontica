import { useEffect, useState } from 'react';
import { fetchTermsAndConditions } from '../../services/properties/propertyService';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAccept }) => {
    const [terms, setTerms] = useState<string>('');

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            fetchTermsAndConditions().then(setTerms).catch(console.error);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/2 lg:w-2/3  max-h-[100vh] flex flex-col">
                <div className="p-6 flex justify-between items-center border-b">
                    <h2 className='text-2xl font-bold text-primary'>Términos y Condiciones</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">
                    <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: terms }}
                    />
                </div>
                <div className="p-6 border-t">
                    <Button 
                        onClick={() => {
                            onAccept();
                            onClose();
                        }}
                    >
                        Aceptar y Cerrar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;