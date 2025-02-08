import React, { useEffect, useState } from "react";
import Banner from "../components/atomos/Banner";
import Button from "../components/atomos/Button";
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
import GoogleMapComponent from "../components/atomos/GoogleMap";
import { useNavigate } from "react-router-dom";

import { Filters, Property } from "../utils/types";
import PropiedadesBusqueda from "./PropiedadesBusqueda";

const Home: React.FC = () => {
  const { home, properties } = useProperties();
  const navigate = useNavigate();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [filters, setFilters] = useState<Filters>({
    filterTypes: [],
    filterStatus: [],
    filterHood: [],
    filterRooms: null,
    filterGarages: false,
    filterPool: false,
    filterTitle: '',
    sortOrder: null,
  });

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
    console.info(filteredProperties, setFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...properties];

      if (filters.filterTypes.length > 0) {
        filtered = filtered.filter(p => filters.filterTypes.includes(p.type));
      }

      if (filters.filterStatus.length > 0) {
        filtered = filtered.filter(p =>
          p.status.some(s => filters.filterStatus.includes(s))
        );
      }

      if (filters.filterHood.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.neighborhood) return false;
          const propertyHood = p.neighborhood.trim().toLowerCase();
          return filters.filterHood.some(
            filtro => filtro.trim().toLowerCase() === propertyHood
          );
        });
      }

      if (filters.filterRooms) {
        filtered = filtered.filter(p => filters.filterRooms!.includes(p.rooms ? p.rooms : 0));
      }
      if (filters.filterGarages) {
        filtered = filtered.filter(p => p.garage);
      }
      if (filters.filterPool) {
        filtered = filtered.filter(p => p.pool);
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  return (
    <div className="space-y-8  max-w-full">
      <div className="relative mx-auto">
        <Banner />
      </div>

      <div className="lg:max-w-[75%] mx-auto">
        <div className="mx-auto">
          <section className="w-full">
            <PropiedadesBusqueda />
          </section>
        </div>
        <hr />
        <section className="px-0">
          {home.sale && home.sale.length > 0 && (
            <>
              <Title text="En venta" />
              <Carousel properties={home.sale.length ? home.sale : []} />
              <div className="py-3">
                <Button onClick={() => navigate("/properties?filter=sale")}>Ir a propiedades en venta</Button>
              </div>
              <hr />
            </>
          )}

          {home.rent && home.rent.length > 0 && (
            <>
              <Title text="En alquiler" />
              <Carousel properties={home.rent.length ? home.rent : []} />
              <div className="py-3">
                <Button onClick={() => navigate("/properties?filter=rent")}>Ir a propiedades en alquiler</Button>
              </div>
              <hr />
            </>
          )}
        </section>

        <section className="relative h-[500px] md:h-[500px] overflow-hidden">
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${desktopImage})` }}
          ></div>
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
                <Button onClick={() => navigate("/properties?filter=pinned")}>Ir a propiedades destacadas</Button>
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
                <Button to="/properties/favourites">Ir a tus propiedades favoritas</Button>
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
                <Button to="/properties/created">Ir a tus propiedades</Button>
              </div>
              <hr />
            </>
          )}
        </section>
        <div>
          {properties.length > 0 &&
            <GoogleMapComponent properties={properties} />
          }


        </div>


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
