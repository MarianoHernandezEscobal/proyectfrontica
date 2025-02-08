import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAlert } from "../../contexts/AlertContext";
import { hasCookie } from "../../utils/cookie";
import { createRent, getRents } from "../../services/rent/rentService";
import { Rent } from "../../utils/types";
import CustomDatePicker from "./DateInput";

interface RentalModalProps {
  propertyId: number;
}

const RentalModal: React.FC<RentalModalProps> = ({ propertyId }) => {
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [rents, setRents] = useState<Rent[]>([]);

  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const data = await getRents(propertyId);
        setRents(data);
      } catch (error) {
        console.error("Error al obtener las rentas:", error);
      }
    };
    fetchRents();
  }, [propertyId]);

  useEffect(() => {
    if (sessionStorage.getItem("userData") && hasCookie("sessionIndicator")) {
      setIsLogged(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    if (!checkIn || !checkOut) {
      showAlert("error", "Por favor, selecciona ambas fechas");
      setStatus("idle");
      return;
    }

    if (checkOut <= checkIn) {
      showAlert("error", "La fecha de salida debe ser posterior a la fecha de entrada");
      setStatus("idle");
      return;
    }

    try {
      await createRent({
        email: !isLogged
          ? email
          : JSON.parse(sessionStorage.getItem("userData") || "{}").email,
        checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
        checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
        message,
        propertyId,
        user: !isLogged
          ? undefined
          : JSON.parse(sessionStorage.getItem("userData") || "{}").id,
      });

      setStatus("success");
      showAlert("success", "¡Solicitud enviada correctamente!");

      setEmail("");
      setCheckIn(null);
      setCheckOut(null);
      setMessage("");
    } catch (error) {
      setStatus("error");
      let errorMessage = "Error al crear la solicitud";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      throw new Error(errorMessage);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg">
      <h3 className="text-lg font-bold mb-4">Solicita tu alquiler</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogged && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 p-2 border rounded"
              required
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            rents={rents}
            placeholderText="Fecha de Entrada"
            className="rounded sm:rounded-l-lg sm:rounded-r-none"
          />
          <CustomDatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            rents={rents}
            placeholderText="Fecha de Salida"
            className="rounded sm:rounded-r-lg sm:rounded-l-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
            rows={4}
            placeholder="Agrega detalles adicionales"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded hover:bg-background-neutral disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default RentalModal;
