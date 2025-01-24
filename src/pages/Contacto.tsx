import React, { useEffect } from 'react';
import FormContacto from '../components/FormContacto';
import ContactItemsProps from '../components/ContactItemsProps';
import Gmap from '../components/Gmap';
import Title from '../components/atomos/Title';

const Contacto: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className=" mx-10 bg-background-neutral">
            <Title text="Contacto" size='large' />
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1">
                    <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        relative
                        w-lg-[600px]
                    `}>
                        <FormContacto />
                    </article>
                </div>
                <div className="flex-1 mt-8 lg:mt-0">
                    <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800

                        relative
                    `}>
                        <ContactItemsProps />
                    </article>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <Gmap />
            </div>
        </div>
    );
};

export default Contacto;