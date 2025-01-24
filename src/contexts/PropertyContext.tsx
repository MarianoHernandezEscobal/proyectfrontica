import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Property, Home } from "../utils/types";
import { fetchHomeClient, fetchProperties } from "../services/properties/propertyService";

interface PropertyContextType {
    properties: Property[];
    home: Home;
    fetchAllProperties: () => Promise<void>;
    fetchHome: () => Promise<void>;
    setProperties: (properties: Property[]) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [home, setHome] = useState<Home>({ rent: [], sale: [], pinned: [] });

    const fetchAllProperties = async (): Promise<void> => {
        try {
            const data = await fetchProperties();
            setProperties(data);
        } catch (error) {
            console.error("Error al cargar las propiedades:", error);
        }
    };

    const fetchHome = async () => {
        try {
            const data = await fetchHomeClient();
            if (data.created && data.created.length > 0) {
                localStorage.setItem('createdProperties', JSON.stringify(data.created));
            }
            if (data.pinned && data.pinned.length > 0) {
                localStorage.setItem('pinnedProperties', JSON.stringify(data.pinned));
            }
            if (data.favourites && data.favourites.length > 0) {
                localStorage.setItem('favouritesProperties', JSON.stringify(data.favourites));
            }
            console.log('fetchHome Contest',data);
            setHome(data);
        } catch (error) {
            console.error("Error al cargar las propiedades:", error);
        }
    };

    useEffect(() => {
        fetchAllProperties();
        fetchHome();
    }, []);

    return (
        <PropertyContext.Provider value={{ properties, home, fetchAllProperties, fetchHome, setProperties }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperties = (): PropertyContextType => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error("useProperties debe ser usado dentro de un PropertyProvider");
    }
    return context;
};