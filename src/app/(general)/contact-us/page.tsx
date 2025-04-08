"use client";

import Title from "@/components/ladingpage/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const selectedCountryId = getCookie("selectedCountryId");
    if (!selectedCountryId) {
      setErrorMessage(
        "Por favor selecciona un país antes de enviar el formulario."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
          country: selectedCountryId,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Mensaje enviado con éxito.");
        setFullName("");
        setEmail("");
        setMessage("");
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        setErrorMessage(
          errorData.error || "Error al enviar el mensaje. Inténtalo de nuevo."
        );
      }
    } catch (e) {
      setErrorMessage(
        e instanceof Error
          ? e.message
          : "Ocurrió un error inesperado. Por favor, vuelve a intentarlo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mt-6 items-start">
          <section className="p-6 text-verdeLimon">
            <h2 className="font-bold text-lg md:text-2xl mb-4">
              Contáctanos ahora
            </h2>
            <p className="mb-4 text-sm md:text-lg">
              Contamos con 75 años de experiencia, siendo líderes en el mercado
              de la industria. Somos reconocidos por nuestros productos de
              calidad, servicio eficiente y mejora continua.
            </p>
            <p className="font-bold mb-4 text-sm md:text-lg">
              ¡Somos tu socio de negocios!
            </p>
            <div className="flex items-center mb-4">
              <Image
                src="/icons/ubicacion-4.png"
                alt="pin"
                width={25}
                height={60}
                className="object-contain mr-4"
              />
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">Vísitanos</h3>
                <p className="text-xs md:text-lg">
                  25 W. Su N 783, San Salvador
                </p>
              </section>
            </div>
            <div className="flex items-center mb-4">
              <Image
                src="/icons/correo-electronico-3.png"
                alt="email"
                width={25}
                height={60}
                className="object-contain mr-4"
              />
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">
                  Correo electrónico
                </h3>
                <p className="text-xs md:text-lg">acavisa.info@acavisa.com</p>
              </section>
            </div>
          </section>

          <section className="px-3">
            <Title align="left" size="sm">
              <p>Escríbenos</p>
            </Title>

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-deepGray">
                  Tu nombre
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full bg-white rounded-none"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-deepGray">
                  Tu E-Mail
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full bg-white rounded-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-deepGray">
                  Mensaje
                </label>
                <Textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="w-full bg-white rounded-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className={`bg-primary rounded-none w-full sm:w-1/3 mt-4 hover:bg-secondary ${
                  isLoading ? "opacity-70 cursor-wait" : ""
                }`}
                disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </form>

            {successMessage && (
              <div className="mt-4 text-green-500">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mt-4 text-red-500">{errorMessage}</div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
