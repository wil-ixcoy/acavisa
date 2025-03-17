/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Title from "@/components/ladingpage/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, message }),
      });

      if (response.ok) {
        setSuccessMessage("Mensaje enviado con éxito.");
        setFullName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error || "Error al enviar el mensaje. Inténtalo de nuevo."
        );
        console.error("Error al enviar a la API:", errorData);
      }
    } catch (err: any) {
      setErrorMessage("Ocurrió un error inesperado.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">Vísitanos</h3>
                <p className="text-xs md:text-lg">
                  25 W. Su N 783, San Salvador
                </p>
              </section>
            </div>
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                />
              </svg>
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">
                  Correo electronico
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
                  className="w-full"
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
                  className="w-full"
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
                  className="w-full"
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

      <Footer />
    </div>
  );
}
