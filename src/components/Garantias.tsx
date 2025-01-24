import React from 'react';
import Title from './atomos/Title';

const Garantias: React.FC = () => {
    return (
        <section className=''>
            <Title text="Nuestras garantías" size='large' />
            <p className='pb-4'>Orgullosos de formar parte de estas instituciones.</p>
            <div className="flex flex-col items-center md:flex-row md:justify-around p-4 gap-8">
                <img
                    src="https://i2.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/inmobiliaria_habilitada.png?resize=90%2C90&amp;ssl=1"
                    alt="Inmobiliaria Habilitada"
                    width="110"
                />
                <img
                    src="https://i0.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/camara_inmobiliaria_uruguaya.png?resize=190%2C73&amp;ssl=1"
                    alt="Cámara Inmobiliaria Uruguaya"
                    width="250"
                />
                <img
                    src="https://i0.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/camara_inmobiliaria_rocha.png?resize=196%2C73&amp;ssl=1"
                    alt="Cámara Inmobiliaria de Rocha"
                    width="250"
                />
            </div>
        </section>
    );
};

export default Garantias;