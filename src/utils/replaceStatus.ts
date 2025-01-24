import { PropertyStatus } from "./types";

export const replaceStatus = (status: PropertyStatus): string => {
  switch (status) {
    case PropertyStatus.ForSale:
      return "en venta";
    case PropertyStatus.ForRent:
      return "en alquiler";
    case PropertyStatus.Reserved:
      return "reservada";
    case PropertyStatus.Sold:
      return "vendida";
    case PropertyStatus.Rented:
      return "alquilada";
    case PropertyStatus.UnderConstruction:
      return "en construcción";
    default:
      return "estado no definido";
  }
};

