import React, { useEffect, useState } from "react";
import Banner from "../components/atomos/Banner";
import Button from "../components/atomos/Button";
import FormBusqueda from "../components/FormBusqueda";
import Carousel from "../components/CarouselPropiedades";
import Title from "../components/atomos/Title";
import Garantias from "../components/Garantias";
import Nosotros from "../components/Nosotros";
import { useProperties } from "../contexts/PropertyContext";

import playa1Gif from "../assets/imgs/playas/playa1.gif";
import playa2Gif from "../assets/imgs/playas/playa3.gif";
import playaMobile1Gif from "../assets/imgs/playas/playa2-mobile.gif";
import playaMobile2Gif from "../assets/imgs/playas/playa3-mobile.gif";
import WhatsappButton from "../components/atomos/WhatsappButton";
// import MapaHome from '../components/atomos/MapaHome';

const Home: React.FC = () => {
  const { home } = useProperties();

  // hooks para cambiar las imágenes en parallax
  const [desktopImage, setDesktopImage] = useState(playa1Gif);
  const [mobileImage, setMobileImage] = useState(playaMobile1Gif);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopImage((prevImage) =>
        prevImage === playa1Gif ? playa2Gif : playa1Gif
      );
      setMobileImage((prevImage) =>
        prevImage === playaMobile1Gif ? playaMobile2Gif : playaMobile1Gif
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8  max-w-full">
      <div className="relative mx-auto">
        <Banner />
      </div>

      <div className="lg:max-w-[75%] mx-auto">
        <section>
          <FormBusqueda />
        </section>
        <hr />
        <section className="px-0">
          {home.sale && home.sale.length > 0 && (
            <>
              <Title text="En venta" />
              <Carousel properties={home.sale.length ? home.sale : []} />
              <div className="py-3">
                <Button to="/ventas">Ir a propiedades en venta</Button>
              </div>
              <hr />
            </>
          )}

          {home.rent && home.rent.length > 0 && (
            <>
              <Title text="En alquiler" />
              <Carousel properties={home.rent.length ? home.rent : []} />
              <div className="py-3">
                <Button to="/alquileres">Ir a propiedades en alquiler</Button>
              </div>
              <hr />
            </>
          )}
        </section>

        {/* Efecto Parallax */}
        <section className="relative h-[500px] md:h-[500px] overflow-hidden">
          {/* Fondo para escritorio */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${desktopImage})` }}
          ></div>
          {/* Fondo para móviles */}
          <div
            className="block md:hidden absolute inset-0 bg-cover bg-center bg-fixed h-[1000px]"
            style={{ backgroundImage: `url(${mobileImage})` }}
          ></div>
        </section>
        <hr />
        <section className="px-0">
          {home.pinned && home.pinned.length > 0 && (
            <>
              <Title text="Propiedades destacadas" />
              <Carousel properties={home.pinned.length ? home.pinned : []} />
              <div className="py-3">
                <Button to="/destacadas">Ir a propiedades destacadas</Button>
              </div>
              <hr />
            </>
          )}
        </section>
        <section className="px-0">
          {home.favourites && home.favourites.length > 0 && (
            <>
              <Title text="Tus propiedades favoritas" size="large" />
              <Carousel
                properties={home.favourites.length ? home.favourites : []}
              />
              <div className="py-3">
                <Button to="/">Ir a tus propiedades favoritas</Button>
              </div>
              <hr />
            </>
          )}
        </section>
        <section className="px-0">
          {home.created && home.created.length > 0 && (
            <>
              <Title text="Tus propiedades" size="large" />
              <Carousel properties={home.created.length ? home.created : []} />
              <div className="py-3">
                <Button to="/">Ir a tus propiedades</Button>
              </div>
              <hr />
            </>
          )}
        </section>
        {/* <hr />
                // mapa con todas las propiedades, hay q terminar de setear las apiKey de google en el componente
                <div className="lg:max-w-[1200px] mx-auto">
                    <section className="px-0">
                        <Title text="Propiedades en el mapa" size="large" />
                        <MapaHome properties={allPropiedades} /> 
                    </section>
                 </div> */}


        <section className="px-0">
          <Title text="Nosotros" size="large" />
          <Nosotros />
        </section>
        <hr />
        <Garantias />
        <hr />
      </div>
      <WhatsappButton />
    </div>
  );
};

export default Home;
