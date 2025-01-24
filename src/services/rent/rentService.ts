import { BASE_URL } from "../../utils/constants";
import { Rent } from "../../utils/types";
import { logoutUser } from "../users/userService";


export const createRent = async (rentData: Rent) => {
  try {
    const res = await fetch(`${BASE_URL}/rent/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rent: rentData }),
    });
    if (res.status === 401) {
      await logoutUser();
      window.location.href = "/login";
      return;
    }
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error desconocido");
    }
  } catch (error) {
    let errorMessage = "Error desconocido";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.error("Error al crear la renta:", errorMessage);
    throw new Error(errorMessage);
  }
};
