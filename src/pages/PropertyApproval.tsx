import { useEffect, useState } from "react";
import { Property } from "../utils/types";
import { findToApprove } from "../services/properties/propertyService";
import PropertyCardApproved from "../components/atomos/PropertyCardApprove";
import Title from "../components/atomos/Title";
import Button from "../components/atomos/Button";

const ApprovePropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await findToApprove();
        console.log(response);
        setProperties(response);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las propiedades");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (

    <div className="my-12 flex flex-col min-h-screen">
      <Title text="Mis Propiedades Favoritas" />

      <div className="flex flex-grow  flex-col items-center">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index} className="py-4">
              <PropertyCardApproved property={property} setProperties={setProperties} />
            </div>
          ))
        ) : (
          <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
        )}
      </div>
      <Button
        onClick={() => window.history.back()}
        clase="mb-4 bg-primary-light hover:bg-primary-dark text-text-light fixed bottom-4 left-6 z-50"
      >
        Volver
      </Button>
    </div>
  );
};



export default ApprovePropertiesPage;
