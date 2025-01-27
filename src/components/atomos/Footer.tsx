import type React from "react"
import { Link } from "react-router-dom"
import { FaFacebookSquare, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa"
import logo from "../../assets/imgs/logo.png"

const socialLinks = [
    {
        icon: FaFacebookSquare,
        href: "https://www.facebook.com/inmobiliariacostaazul.lapaloma",
        label: "Facebook",
        hoverColor: "hover:text-accent-light",
    },
    {
        icon: FaYoutube,
        href: "https://www.youtube.com/channel/UCDNHUcAabL3I4XRk71CACqg",
        label: "YouTube",
        hoverColor: "hover:text-status-error",
    },
    {
        icon: FaWhatsapp,
        href: "https://api.whatsapp.com/send?phone=59898384860&text=&source=&data=",
        label: "WhatsApp",
        hoverColor: "hover:text-status-success",
    },
]

const navLinks = [
    { to: "/home", text: "Inicio" },
    { to: "/properties/", text: "Propiedades" },
    { to: "/contact/", text: "Contacto" },
]

const contactInfo = [
    {
        icon: FaMapMarkerAlt,
        content: "Profesor Yaneo esq. Zapicán en Costa Azul, La Paloma, Rocha",
        href: "https://www.google.com/maps/place/Real+Estate+Costa+Azul/@-34.6345552,-54.1634234,17z/data=!3m1!4b1!4m6!3m5!1s0x95749c887837af5d:0xc00eb1ee62df83f8!8m2!3d-34.6345552!4d-54.1608485!16s%2Fg%2F1pp2w_lp7?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D",
    },
    { icon: FaPhoneAlt, content: "(+598) 4479 8463" },
    {
        icon: FaEnvelope,
        content: "consultas@inmobiliariacostaazul.com",
        href: "mailto:consultas@inmobiliariacostaazul.com",
    },
]

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={`sticky top-[100vh] p-5 bg-gradient-to-b to-accent-light from-background-neutral text-text-light`}>
            <div className="max-w-7xl mx-auto px-4 py-8 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <Link to="/Home" className="mb-4 sm:mb-0" title="Inmobiliaria Costa Azul">
                        <img
                            src={logo || "/placeholder.svg"}
                            alt="Inmobiliaria Costa Azul"
                            width="100"
                            height="60"
                            className="w-auto h-15"
                        />
                    </Link>
                    <div className="flex space-x-6">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                <link.icon className={`text-2xl ${link.hoverColor} transition-colors duration-300`} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start md:pl-4">
                    <nav>
                        <h2 className="text-lg text-accent-dark font-semibold mb-4">Enlaces rápidos</h2>
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="block hover:text-accent-dark transition-colors duration-300 mb-2"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col items-center sm:items-start">
                        <h2 className="text-lg text-accent-dark font-semibold mb-4">Información de contacto</h2>
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-start space-x-2 mb-2">
                                <info.icon className="mt-1 flex-shrink-0" />
                                <p className="text-sm">
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-accent-dark hover:underline transition-colors duration-300"
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        info.content
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-text-light/20 text-left">
                    <p className="text-sm">&copy; {currentYear} Inmobiliaria Costa Azul. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

