import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsappButtonProps {
    wppNumber?: string;
    wppMessage?: string;
    urlMessage?: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({
    wppNumber = "59895385147",
    wppMessage = "Hola, estoy interesado en sus propiedades.",
    urlMessage,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const isHomePage = location.pathname === '/' || location.pathname.toLowerCase() === '/home';

    useEffect(() => {
        if (isHomePage) {
            const handleScroll = () => {
                if (window.scrollY > 250) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            };
            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
        setIsVisible(true);

    }, []);

    const message: string = urlMessage
        ? `Hola, estoy interesado en esta propiedad ${urlMessage}`
        : wppMessage;

    return (
        <>
            {isVisible && (
                <a
                    href={`https://api.whatsapp.com/send?phone=${wppNumber}&text=${encodeURIComponent(message)}&app_absent=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
                >
                    <FaWhatsapp className="text-4xl" />
                </a>
            )}
        </>
    )
}

export default WhatsappButton