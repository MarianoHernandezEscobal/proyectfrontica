import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAlert } from "../../contexts/AlertContext";
import { hasCookie } from "../../utils/cookie";
import { createRent } from "../../services/rent/rentService";

interface RentalModalProps {
  propertyId: number;
}

const RentalModal: React.FC<RentalModalProps> = ({ propertyId }) => {
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await createRent({
        email: !isLogged ? email : JSON.parse(sessionStorage.getItem("userData") || "{}").email,
        checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
        checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
        message,
        propertyId,
        user: !isLogged ? undefined : JSON.parse(sessionStorage.getItem("userData") || "{}").id,
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

  useEffect(() => {
    console.log(sessionStorage.getItem("userData"));
    if (sessionStorage.getItem("userData") && hasCookie("sessionIndicator")) {
      setIsLogged(true);
    }
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Fecha de Entrada */}
          <div className="relative">
            <input
              id="checkIn"
              type="date"
              value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
              onChange={(e) => setCheckIn(e.target.valueAsDate)}
              className="block w-full px-4 pt-6 pb-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              required
            />
            <label
              htmlFor="checkIn"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Fecha de Entrada
            </label>
          </div>

          {/* Fecha de Salida */}
          <div className="relative">
            <input
              id="checkOut"
              type="date"
              value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
              onChange={(e) => setCheckOut(e.target.valueAsDate)}
              className="block w-full px-4 pt-6 pb-1 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              required
            />
            <label
              htmlFor="checkOut"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Fecha de Salida
            </label>
          </div>
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
