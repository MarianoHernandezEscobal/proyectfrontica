import { FaPhone, FaMobileAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactItemProps {
    icon: React.ReactNode;
    label: string;
    content: string;
    link?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, content, link }) => {
    return (
        <div className="flex items-center space-x-4 my-4 p-4 ">
            <div className="icon w-5 h-5 text-gray-700 dark:text-gray-300">{icon}</div>
            <p className="content text-gray-800 dark:text-gray-100">
                <span className="label font-semibold text-gray-800">{label}: </span>
                {link ? (
                    <a href={link} className="text-green-700 hover:underline">
                        {content}
                    </a>
                ) : (
                    <span className="text-gray-600">{content}</span>
                )}
            </p>
        </div>
    );
};

const ContactDetails: React.FC = () => {
    return (
        <div className="rh_contact__details p-4 rounded-md">
            <ContactItem
                icon={<FaPhone className="text-green-400 mb-2 " />}
                label="Teléfono"
                content="(+598) 4479 8463"
                link="tel:(+598) 4479 8463"
            />
            <ContactItem
                icon={<FaMobileAlt className="text-green-400 mb-2 " />}
                label="Móvil"
                content="095786120"
                link="tel:095786120"
            />
            <ContactItem
                icon={<FaEnvelope className="text-green-400 mb-2 " />}
                label="Correo electrónico"
                content="consultas@inmobiliariacostaazul.com"
                link="mailto:consultas@inmobiliariacostaazul.com"
            />
            {/* <ContactItem
                icon={<FaMapMarkerAlt className="text-green-400 mb-2 " />}
                label="Dirección"
                content="Profesor Yaneo esq. Zapicán en Costa Azul, La Paloma, Rocha"
            /> */}
            <a
                href="https://www.google.com/maps/place/Real+Estate+Costa+Azul/@-34.6345552,-54.1634234,17z/data=!3m1!4b1!4m6!3m5!1s0x95749c887837af5d:0xc00eb1ee62df83f8!8m2!3d-34.6345552!4d-54.1608485!16s%2Fg%2F1pp2w_lp7?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className='p-4'
            >
                <FaMapMarkerAlt className=" inline-block text-green-400 mb-2 " />
                <span className=' ml-8 text-green-700 hover:underline'>
                    Profesor Yaneo esq. Zapicán en Costa Azul
                </span>
            </a>
        </div>
    );
};

export default ContactDetails;
