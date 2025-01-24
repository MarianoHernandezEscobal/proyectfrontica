import { Property } from "../../utils/types";
import React from "react";
import { StatusBadge } from "./StatusBadge";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
    <article className="w-full rounded-lg p-6 text-text-primary md:w-2/4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Left Column */}
        <div className="grid gap-4">
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">Estado</h2>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Property statuses"
            >
              {property.status.map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">Barrio</h2>
            <p className="text-secondary font-medium">{property.neighborhood}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-4">
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">Dirección</h2>
            <p className="text-text-secondary break-words">{property.address}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">Contribución</h2>
            <p className="text-secondary font-medium">
              $ {Number(property.contribution).toLocaleString("de-DE")} por año
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4 border-t border-background-dark" />

      <div>
        <h2 className="text-lg font-bold text-primary mb-3">Descripción completa</h2>
        <p className="text-text-secondary leading-relaxed">{property.longDescription}</p>
      </div>
    </article>
  );
};

export default PropertyInfo;
