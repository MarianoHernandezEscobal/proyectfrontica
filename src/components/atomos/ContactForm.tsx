import React, { useEffect, useState } from "react";
import { hasCookie } from "../../utils/cookie";
import { sendEmail } from "../../services/mail/mailService";
import { useAlert } from "../../contexts/AlertContext";

interface ContactFormProps {
  propertyId: number;
  isRent: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ propertyId, isRent }) => {
  const [email, setEmail] = useState("");
  const [content, setMontent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isLogged, setIsLogged] = useState(false);
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const user = JSON.parse(sessionStorage.getItem("userData") || "{}");

    try {
      const response = await sendEmail(
        {
          isRent,
          content,
          id: propertyId,
          subject: `Consulta por propiedad ${propertyId}`,
          from: isLogged ? user.email : email,
        });
      if (!response) throw new Error("Error al enviar el formulario");

      showAlert("success", "Consulta enviada correctamente");
      setStatus("success");
      setEmail("");
      setMontent("");
    } catch (error) {
      console.error(error);
      showAlert("error", "Error al enviar la consulta. Intente nuevamente");
      setStatus("error");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("userData") && hasCookie("sessionIndicator")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="w-full p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Contáctanos</h3>
      <p className="text-sm mb-3">
        Déjanos tu mensaje y te contactaremos a la brevedad.
      </p>
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
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setMontent(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
