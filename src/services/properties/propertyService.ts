import { Home, Property, PropertyStatus } from "../../utils/types";
import axios from "axios";
import { logoutUser } from "../users/userService";
import { BASE_URL } from "../../utils/constants";


export const createProperty = async (propertyData: Omit<Property, 'id'>, files: File[]) => {
  const formData = new FormData();

  formData.append("property", JSON.stringify(propertyData));

  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${BASE_URL}/property/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (res.status === 401) {
    await logoutUser();
    window.location.href = "/login";
  }
  if (!res.ok) throw new Error('Error creating property');
  return await res.json();
};

export const updateProperty = async (
  propertyData: Property,
  deletedImages: string[],
  newImages: File[]
) => {
  const formData = new FormData();
  formData.append("property", JSON.stringify(propertyData));
  formData.append("deletedImages", JSON.stringify(deletedImages));
  newImages.forEach((file) => formData.append("files", file));

  const res = await fetch(`${BASE_URL}/property/update`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) throw new Error('Error al actualizar la propiedad');
  return await res.json();
};


export const fetchHomeClient = async (): Promise<Home> => {
  try {
    const res = await fetch(`${BASE_URL}/property/home`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    if (!res.ok) throw new Error('Error obteniendo propiedades');
    return await res.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return {rent: [], sale: [], pinned: []};
  }
}

export const fetchCreated = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${BASE_URL}/property/createdProperties`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    if (!res.ok) throw new Error('Error obteniendo creadas');
    return await res.json();
  }catch(error){
    console.error("Error al obtener tus propiedades creadas:", error);
    return [];
  }
};

export const fetchFavourites = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${BASE_URL}/favorites/get`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    if (!res.ok) throw new Error('Error obteniendo favoritas');
    return await res.json();
  }catch(error){
    console.error("Error al obtener tus propiedades favoritas:", error);
    return [];
  }
};


export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${BASE_URL}/property/findAll`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    if (!res.ok) throw new Error('Error obteniendo propiedades');
    return await res.json();
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const fetchProperty = async (id: number): Promise<Property> => {
  try {
    const response = await axios.get(`${BASE_URL}/property/findOne`, {params: {id}});
    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    return response.data;
  } catch {
    throw new Error("Error al cargar la propiedad");
  }
};

export const fetchTermsAndConditions = async (): Promise<string> => {
  try {
    const response = await axios.get(`${BASE_URL}/property/terms`);
    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
    }
    return response.data;
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return '';
  }
};

export const addFavourite = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/favorites/add?propertyId=${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return false;
    }
    return true;
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return false;
  }
};

export const removeFavourite = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/favorites/delete?propertyId=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

  if (response.status === 401) {
    await logoutUser();
    window.location.href = "/login";
    return false;
  }
    return true;
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return false;
  }
};

export const findToApprove = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${BASE_URL}/property/findToApproved`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return [];
    }
    return await response.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const approveProperty = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/property/approve`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id, approved: true}),
    });

    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return false;
    }
    return true;
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return false;
  }
};

export const deleteProperty = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/property/delete?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return false;
    }

    if (response.status === 403) throw new Error('No tienes los permisos necesarios.');
    return true;
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return false;
  }
}

export const fetchPropertiesByStatus = async (status: PropertyStatus): Promise<Property[]> => {
  try {
    const response = await fetch(`${BASE_URL}/property/findByStatus?status=${status}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return [];
    }
    return await response.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
}