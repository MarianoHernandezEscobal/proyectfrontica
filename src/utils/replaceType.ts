import { PropertyTypes } from "./types";

export const replaceType= (status: PropertyTypes): string => {
  switch (status) {
    case PropertyTypes.HOUSE:
      return "casa";
    case PropertyTypes.APARTMENT:
      return "apartamento";
    case PropertyTypes.LAND:
      return "terreno";
    case PropertyTypes.OFFICE:
      return "oficina";
    case PropertyTypes.STORE:
      return "tienda";
    default:
      return "otro";
  }
};

