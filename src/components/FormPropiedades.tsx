import React, { useState, useCallback, useEffect } from "react";
import Button from "./atomos/Button";
import InputField from "./atomos/InputFieldProps";
import MockMap from "../assets/MockMapProps";
import { useNavigate } from "react-router-dom";
import { PropertyStatus, PropertyTypes, Property } from "../utils/types";
import Title from "./atomos/Title";
import { replaceType } from "../utils/replaceType";
import PropertyCard from "./atomos/PropertyCard";
import { useDropzone } from "react-dropzone";
import {
  createProperty,
  updateProperty,
} from "../services/properties/propertyService";
import { Barrios } from "../assets/barrios";
import { PropertyStatusSelect } from "./atomos/PropertyStatusSelect";
import ModalTerms from "./atomos/ModalTerms";
import TextareaField from "./atomos/TextareaField";
import ImagePreview from "./atomos/ImagesPrewiev";

interface PropertyFormProps {
  onAddProperty?: (newProperty: Omit<Property, "id">) => void;
  onUpdateProperty?: (updatedProperty: Property) => void;
  property?: Property;
}

const inicializarPropiedad = {
  id: 0,
  title: "",
  description: "",
  longDescription: "",
  price: 0,
  type: "" as PropertyTypes,
  status: [] as PropertyStatus[],
  lotSize: 0,
  area: 0,
  rooms: 0,
  bathrooms: 0,
  address: "",
  geoCordinates: {
    lat: 0,
    lng: 0,
  },
  neighborhood: "",
  yearBuilt: "0",
  garages: false,
  pool: false,
  contribution: "0",
  imageSrc: [],
  pinned: false,
  approved: false,
};

const PropertyForm: React.FC<PropertyFormProps> = ({
  onAddProperty,
  onUpdateProperty,
  property,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Property>(
    property || inicializarPropiedad
  );

  const [newImages, setNewImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (property) {
      setFormData(property);
      setExistingImages(property.imageSrc || []);
      setPreviewImages(property.imageSrc || []);
    }
  }, [property]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleStatusChange = (selectedStatus: PropertyStatus[]) => {
    setFormData((prev) => ({ ...prev, status: selectedStatus }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImageSrc = acceptedFiles.map((file) => URL.createObjectURL(file));
    setNewImages((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setPreviewImages((prevImages) => [...prevImages, ...newImageSrc]);
  }, []);

  const handleDeleteImage = (index: number) => {
    const imageToDelete = previewImages[index];
    console.log("existingImages", existingImages);
    console.log("imageToDelete", imageToDelete);

    if (existingImages.includes(imageToDelete)) {
      if (!deletedImages.includes(imageToDelete)) {
        setDeletedImages((prev) => [...prev, imageToDelete]);
      }
      setExistingImages((prev) => prev.filter((img) => img !== imageToDelete));
      console.log("deletedImages", deletedImages);

    } else {
      setNewImages((prev) =>
        prev.filter((_, i) => i !== index - existingImages.length)
      );
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalAccept = async () => {
    setModalOpen(false);
    try {
      if (property) {
        const updatedProperty = await updateProperty(
          formData,
          deletedImages,
          newImages
        );
        if (onUpdateProperty) {
          onUpdateProperty(updatedProperty);
        }
        navigate(`/properties/${updatedProperty.id}`);
      } else {
        const newProperty = await createProperty(formData, newImages);
        if (onAddProperty) {
          onAddProperty(newProperty);
        }
        setFormData(inicializarPropiedad);
        setNewImages([]);
        navigate(`/properties/${newProperty.id}`);
      }
    } catch (error) {
      console.error("Error al enviar la propiedad:", error);
    }
  };

  return (
    <div className="md:p-4 space-y-6">
      {/* Contenedor dividido en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 border-2 border-grey p-4 md:p-8 mt-10 rounded-md"
        >
          <Title size="medium" text="Datos de la propiedad" />
          <p className="text-gray-500 m-0 font-sans">
            Ingrese los detalles de las propiedades.
          </p>

          <div className="space-y-4">
            <InputField
              label="Titulo"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingrese el titulo"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">Imagenes</label>
            <div
              {...getRootProps()}
              className={`w-full p-6 md:p-10 border rounded-md ${
                isDragActive ? "bg-blue-100" : "bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta tus imágenes aquí</p>
              ) : (
                <p>
                  Arrastra y suelta algunos archivos aquí, o haz clic para
                  seleccionar archivos
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {previewImages.map((src, index) => (
                <ImagePreview
                  key={index}
                  src={src || "/placeholder.svg"}
                  onDelete={() => handleDeleteImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ingrese la dirección de la propiedad"
            />
            <div>
              <label className="block text-sm">Barrio</label>

              <select
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                className="w-full mt-1 capitalize p-2 border rounded-md"
              >
                <option disabled value="">
                  Seleccione un barrio
                </option>
                {Barrios.map((barrio) => (
                  <option key={barrio.value} value={barrio.value}>
                    {barrio.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InputField
            label="Precio"
            name="price"
            value={formData.price?.toString() || ""}
            onChange={handleInputChange}
            placeholder="Ingrese la dirección de la propiedad"
            type="number"
          />

          <InputField
            label="Descripción corta"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ingrese una descripción corta"
          />

          <TextareaField
            label="Descripción larga"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Tipo de propiedad</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full capitalize p-2 border rounded-md"
              >
                <option disabled value="">
                  Seleccione un Tipo
                </option>
                {Object.values(PropertyTypes).map((type) => (
                  <option key={type} value={type}>
                    {replaceType(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div>
                <label className="block text-sm font-medium">
                  Estado de la propiedad
                </label>
                <PropertyStatusSelect
                  value={formData.status}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Habitaciones"
              name="rooms"
              value={formData.rooms?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Baños"
              name="bathrooms"
              value={formData.bathrooms?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="garages"
                checked={formData.garages}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Garajes
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pool"
                checked={formData.pool}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Piscina
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Área (m²)"
              name="area"
              value={formData.area?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Tamaño del terreno (m²)"
              name="lotSize"
              value={formData.lotSize?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Año de construcción"
              name="yearBuilt"
              value={formData.yearBuilt?.toString() || ""}
              onChange={handleInputChange}
              placeholder="Ingrese el año de construcción"
            />
            <InputField
              label="Contribución"
              name="contribution"
              value={formData.contribution?.toString() || ""}
              onChange={handleInputChange}
              placeholder="Cuanto se paga de constribucion"
              type="number"
            />
          </div>

          <MockMap
            onClick={(latLng) =>
              setFormData((prev) => ({
                ...prev,
                geoCordinates: {
                  lat: latLng.lat,
                  lng: latLng.lng,
                },
              }))
            }
          />

          <Button type="submit" clase="w-full text-white">
            {property ? "Actualizar Propiedad" : "Crear Propiedad"}
          </Button>
        </form>

        <div className="space-y-8 mt-10 rounded-md">
          <div className="border-2 border-grey p-4 md:p-8 rounded-md">
            <Title
              clase="mb-4"
              size="medium"
              text="Vista previa de la propiedad"
            />
            {formData.title.trim() ? (
              <PropertyCard {...{ ...formData, id: 0 }} />
            ) : (
              <p className="text-gray-500 text-sm">
                Comience a llenar el formulario para ver una vista previa de la
                propiedad.
              </p>
            )}
          </div>
        </div>
      </div>
      <ModalTerms
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAccept={handleModalAccept}
      />{" "}
    </div>
  );
};

export default PropertyForm;
