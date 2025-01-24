import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../utils/types";
import Title from "../components/atomos/Title";
import PropertyForm from "../components/FormPropiedades";
import { fetchProperty } from "../services/properties/propertyService";
import { useProperties } from "../contexts/PropertyContext";
import { useAlert } from "../contexts/AlertContext";

const EditProperty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, setProperties } = useProperties();
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProperty = async () => {
      try {
        if (!id) throw new Error("No se encontró el ID de la propiedad.");
        console.log("properties", properties);
        if (properties.length > 0 && id) {
          const propertyData = properties.find((p) => p.id === parseInt(id));
          if (propertyData) {
            setPropertyToEdit(propertyData);
            return;
          }
        }
        const propertyResponse = await fetchProperty(parseInt(id));
        setPropertyToEdit(propertyResponse);
      } catch {
        showAlert(
          "error",
          "Hubo un problema al cargar los detalles de la propiedad."
        );
      }
    };
    loadProperty();
  }, [id, properties]);

  const onUpdateProperty = (updatedProperty: Property) => {
    const propertiesUpdated = properties.map((property) => {
      if (property.id === updatedProperty.id) {
        return updatedProperty;
      }
      return property;
    });
    setProperties(propertiesUpdated);
  };

  if (!propertyToEdit) {
    return <div>Cargando datos de la propiedad...</div>;
  }

  return (
    <div className="md:p-4 mx-10">
      <Title
        text={`Editando la propiedad: ${propertyToEdit.title}`}
        size="large"
      />

      <div className="lg:max-w-[1300px] mx-auto">
        {/* Pasamos la propiedad a editar al formulario */}
        <PropertyForm
          property={propertyToEdit}
          onUpdateProperty={onUpdateProperty}
        />
      </div>
    </div>
  );
};

export default EditProperty;
