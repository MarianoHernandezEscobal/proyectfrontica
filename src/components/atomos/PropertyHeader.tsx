import type React from "react";
import { Link } from "react-router-dom";
import { replaceStatus } from "../../utils/replaceStatus";
import { PropertyStatus } from "../../utils/types";

interface PropertyHeaderProps {
  title: string;
  price: number;
  location: {
    city?: string;
    neighborhood?: string;
  };
  status: PropertyStatus[];
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ title, price, location, status }) => {
  return (
    <div className="w-full py-6">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col space-y-4">
          {/* Breadcrumb navigation */}
          <nav className="flex flex-wrap items-center space-x-2 text-sm text-primary">
            <Link to="/" className="hover:text-primary-dark transition-colors">
              Inicio
            </Link>
            <span className="text-primary">&gt;</span>
            {location.city && (
              <Link
                to={`/${location.city.toLowerCase()}`}
                className="hover:text-primary-dark transition-colors"
              >
                {location.city}
              </Link>
            )}
            {location.neighborhood && (
              <>
                <span className="text-primary">&gt;</span>
                <Link
                  to={`/${location.city?.toLowerCase() || ""}/${location.neighborhood.toLowerCase()}`}
                  className="hover:text-primary-dark transition-colors"
                >
                  {location.neighborhood}
                </Link>
              </>
            )}
          </nav>

          {/* Header content */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center sm:text-left">{title}</h1>
            <div className="flex flex-col items-center sm:items-end">
              {status.length > 0 && (
                <span className="text-sm text-text-secondary text-center sm:text-right">
                  Propiedades {status.map((s, index) => index < status.length - 1 ? `${replaceStatus(s)}, ` : replaceStatus(s))}
                </span>
              )}
              <p className="text-xl sm:text-2xl font-bold text-accent-light text-center sm:text-right">
                U$S {price.toLocaleString("es-UY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
