// import image from '../../assets/imgs/placeholder.gif';
// import imageMobile from '../../assets/imgs/placeholderMobile.gif';

// const Banner = () => {
//     return (
//         <div className="relative h-screen w-full">
//             <img
//                 src={image}
//                 alt="imagenAnimada"
//                 className="absolute inset-0 w-full h-full object-cover hidden md:block"
//             />
//             <img
//                 src={imageMobile}
//                 alt="imagenAnimada"
//                 className="absolute inset-0 w-full h-full object-cover block md:hidden"
//             />
//         </div>
//     );
// };

// export default Banner;

import { useEffect, useState } from 'react';
import Title from './Title';

const Banner = () => {
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        const firstVisit = localStorage.getItem('firstVisit');

        if (!firstVisit) {
            setIsFirstVisit(true);
            localStorage.setItem('firstVisit', 'true');
        } else {
            setIsFirstVisit(false);
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden ">
            <div className="relative w-full h-0 overflow-hidden pb-[56.25%]">
                <iframe
                    src="https://www.youtube.com/embed/bgzEFsSRSdU?si=4dGwqY8dnLq1o2f4&controls=0&start=13&autoplay=1&loop=1&mute=1&playlist=bgzEFsSRSdU&modestbranding=1&showinfo=0&disablekb=1&rel=0"
                    title="Video de YT"
                    allow=" autoplay; encrypted-media; gyroscope; picture-in-picture"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full pointer-events-none"
                ></iframe>
            </div>
            <div className="absolute inset-0 flex md:mt-[5rem] sm:mt-[2rem]  justify-center text-white text-2xl font-bold">
                {
                    isFirstVisit ?
                        <>
                            <div className="absolute top-0  left-0 h-auto w-auto border-t-4 border-l-4 p-2 ml-5 mb-5 lg:ml-12 border-white">
                                <Title text="Bienvenidos a Inmobiliaria Costa Azul" clase="mt-0 pt-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-white" />
                            </div>
                        </>
                        :
                        <div className="absolute top-0 left-0 h-auto w-auto border-t-4 border-l-4 p-2 ml-5 mt-5 lg:ml-12 border-white">
                            <Title text='Inmobiliaria Costa Azul' clase="mt-0 pt-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:text-center text-white" />
                        </div>
                }
            </div>

            {/* Imagen de fondo para dispositivos móviles */}
            {/* <img
                src={imageMobile}
                alt="imagenAnimada"
                className="absolute inset-0 w-full h-full object-cover block md:hidden"
            /> */}
        </div>
    );
};

export default Banner;
