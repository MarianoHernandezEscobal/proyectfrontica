import React from 'react';
import { FaBuilding, FaWhatsapp, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { AgentProps } from '../utils/types';
import Marcela from '../assets/imgs/equipo/Marcela.jpeg';
import Gerardo from '../assets/imgs/equipo/Gerardo.jpeg';
import { Link } from 'react-router-dom';

const agentsData: AgentProps[] = [
    {
        name: 'Marcela Escobar',
        oficina: '(+598) 4479 8463',
        whatsapp: '095786120',
        email: 'consultas@inmobiliariacostaazul.com',
        propertiesListed: 2,
        imageUrl: Marcela
        // profileUrl: 'https://www.inmobiliariacostaazul.com/agente/alquileres/',
    },
    {
        name: 'Gerardo Hernández',
        oficina: '(+598) 4479 8463',
        whatsapp: '098384860',
        email: 'gerardo@inmobiliaricostaazul.com',
        propertiesListed: 86,
        imageUrl: Gerardo,
        // profileUrl: 'https://www.inmobiliariacostaazul.com/agente/gerardo-hernandez/',
    },
];

const Nosotros: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center p-6 bg-gray-50">
            <p className="text-gray-600 mb-8 text-center">Póngase en contacto con nuestros agentes inmobiliarios profesionales.</p>

            <div className="flex flex-col gap-6 max-w-3xl w-full">
                {agentsData.map((agent, index) => (
                    <article key={index} className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-4 gap-4">
                        {agent.imageUrl ? (
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                <img src={agent.imageUrl} alt={agent.name} className="object-cover w-full h-full" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0"></div>
                        )}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                            {/* <h3 className="text-xl font-semibold text-gray-800">
                                <a href={agent.profileUrl} target="_blank" rel="noopener noreferrer">
                                    {agent.name}
                                </a>
                            </h3> */}

                            <p className="text-gray-500 mb-1 flex items-center">
                                <FaBuilding className="mr-2 text-blue-400" />
                                <a href={`tel:${agent.oficina}`} className="hover:text-green-500 ml-1">{agent.oficina}</a>
                            </p>
                            <p className="text-gray-500 mb-1 flex items-center">
                                <FaWhatsapp className="mr-2 text-blue-400" />
                                <a href={`tel:${agent.whatsapp}`} className="hover:text-green-500 ml-1">{agent.whatsapp}</a>
                            </p>
                            <p className="text-gray-500 mb-1 flex items-center">
                                <FaEnvelope className="mr-2 text-blue-400" />
                                <a href={`mailto:${agent.email}`} className="hover:text-green-500 ml-1">{agent.email}</a>
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-2xl font-bold text-green-400">{agent.propertiesListed}</p>
                                <p className="text-sm text-gray-600">Propiedades Listadas</p>
                            </div>
                        </div>
                        <Link to={"/contacto"} rel="noopener noreferrer" className="text-green-300 hover:text-green-500 text-2xl">
                            <FaArrowRight />
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Nosotros;
