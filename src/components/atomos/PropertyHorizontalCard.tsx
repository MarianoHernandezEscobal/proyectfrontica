import { useEffect, useState } from "react"
import type { Property } from "../../utils/types"
import Button from "./Button"
import { replaceStatus } from "../../utils/replaceStatus"
import { FaBath, FaBed, FaRulerCombined, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import FavButton from "./HeartButton"
import { addFavourite, removeFavourite } from "../../services/properties/propertyService"
import EditButton from "./EditButton"
import { useNavigate } from "react-router-dom"
import { Barrios } from "../../assets/barrios"
import { useAuth } from "../../contexts/AuthContext";

const PropertyHorizontalCard: React.FC<Property> = ({
  id,
  title,
  type,
  address,
  neighborhood,
  description,
  status,
  price,
  rooms,
  bathrooms,
  area,
  imageSrc = [],
}) => {
  const [isFav, setIsFav] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth();

  const handleEdit = async (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/properties/edit/${id}`)
  }

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favouritesProperties") || "[]")
    const isFavourite = favourites.some((fav: { id: number }) => +fav.id === +id)
    setIsFav(isFavourite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrevImage = () => {
    setIsLoading(true)
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    setIsLoading(true)
    setCurrentImageIndex((prevIndex) => (prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1))
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleFavClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favourites = JSON.parse(localStorage.getItem("favouritesProperties") || "[]")

    if (isFav) {
      const updatedFavourites = favourites.filter((fav: { id: number }) => fav.id !== id)
      localStorage.setItem("favouritesProperties", JSON.stringify(updatedFavourites))
      await removeFavourite(id)
    } else {
      const updatedFavourites = [...favourites, { id }]
      localStorage.setItem("favouritesProperties", JSON.stringify(updatedFavourites))
      await addFavourite(id)
    }

    setIsFav((prev) => !prev)
  }
  const image = "https://placehold.co/500x500"

  const replaceType = (type: string): string => {
    switch (type) {
      case "apartment":
        return "Apartamento";
      case "house":
        return "Casa";
      case "office":
        return "Oficina";
      case "warehouse":
        return "Almacén";
      case "store":
        return "Comercio";
      case "land":
        return "Terreno";
      default:
        return "Otro";
    }
  };
  const replaceBarrio = (barrio: string | undefined): string => {
    const found = Barrios.find((b) => b.value === barrio);
    return found ? found.label : "No especificado";
  };
  return (
    <article className="bg-white rounded-lg  shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row h-full md:h-[500px] w-full">
      <figure className="w-full relative group overflow-hidden">
        <div
          className="post_thumbnail bg-center bg-cover w-full h-[300px] sm:h-[400px] md:h-full min-h-[200px] md:min-h-[400px] rounded-t-lg md:rounded-l-lg md:rounded-r-none"
          style={{
            backgroundImage: `url('${imageSrc[currentImageIndex] ?? image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isLoading && imageSrc.length > 1 && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
              <div className="loader"></div>
            </div>
          )}
          <img src={imageSrc[currentImageIndex] ?? image} alt="Property" className="hidden" onLoad={handleImageLoad} />
        </div>
        {imageSrc.length > 0 && (
          <div className="absolute inset-0 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full ml-2"
              onClick={handlePrevImage}
            >
              <FaChevronLeft className="w-3 h-3 text-black  " />
            </button>
            <button
              className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full mr-2"
              onClick={handleNextImage}
            >
              <FaChevronRight className="w-3 h-3 text-black" />
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <FavButton onClick={handleFavClick} isFavourite={isFav} className="opacity-100" />
          </div>
        )}
        {isAuthenticated && user?.admin && (

          <div className="absolute top-2 left-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <EditButton onClick={handleEdit} />
          </div>
        )}
      </figure>

      <div className="w-full md:w-1/2 pl-2 flex flex-col justify-between">
        <div>
          <h3 className="text-xl leading-tight font-bold">
            <span>{title}</span>
            <hr className="m-auto my-4 w-3/4 block md:hidden" />
          </h3>
          <p className="text-gray-500 text-m pb-4">{address}</p>
          <hr className="m-auto w-3/4 block md:hidden" />
        </div>
        <div className="text-lg pt-2">
          <h4 className="font-bold">Descripción</h4>
          <p className="text-gray-500">{description}</p>
          <hr className="m-auto mt-4 w-3/4 block md:hidden" />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-2 flex flex-col justify-between">
        <div className="flex flex-col pb-4 mb-4 w-full space-y-3 flex-grow px-4">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-bold">Tipo:</span>
            <span className="capitalize text-right sm:text-left">{replaceType(type)}</span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-bold">Estado:</span>
            <span className="text-right sm:text-left">
              <span className="capitalize text-red-500 font-bold">{replaceStatus(status[0])}</span>
            </span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-bold">Precio:</span>
            <span className="text-green-700 text-right sm:text-left">U$S {Number(price).toLocaleString("de-DE")}</span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-bold">Barrio:</span>
            <span className="capitalize text-cyan-700 font-bold text-right sm:text-left">
              {replaceBarrio(neighborhood)}
            </span>
          </div>
        </div>
        <div className="pb-3 w-full">
          <div className="mb-6 flex justify-around items-center text-sm text-gray-700">
            <div className="flex flex-col items-center space-x-0 space-y-1">
              <FaBed className="text-accent text-2xl" />
              <span>{rooms} Cuartos</span>
            </div>
            <div className="flex flex-col items-center space-x-0 space-y-1">
              <FaBath className="text-accent text-2xl" />
              <span>{bathrooms} Baños</span>
            </div>
            <div className="flex flex-col items-center space-x-0 space-y-1">
              <FaRulerCombined className="text-accent text-2xl" />
              <span>{area} m²</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <Button clase="text-center w-full" to={`/properties/${id}`}>
            Ver Propiedad
          </Button>
        </div>
      </div>
    </article>
  )
}

export default PropertyHorizontalCard
