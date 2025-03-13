"use client";

import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

export default function JoinUs() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 gap-6 md:mt-6 items-start">
          <section className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-center bg-primary text-white p-3 mb-6 md:w-1/4 md:h-1/4">
              Reclutamiento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  className="rounded-none text-sm md:text-base"
                  type="text"
                  id="name"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <Input
                  className="rounded-none text-sm md:text-base"
                  type="email"
                  id="email"
                  placeholder="Tu E-Mail"
                />
              </div>
              <div>
                <Input
                  className="rounded-none text-sm md:text-base"
                  type="text"
                  id="profession"
                  placeholder="Profesión"
                />
              </div>
              <div>
                <Input
                  className="rounded-none text-sm md:text-base"
                  type="text"
                  id="position"
                  placeholder="Cargo a aplicar"
                />
              </div>
            </div>

            <div className="mt-4">
              <div
                className="relative border rounded-none py-2 px-4 cursor-pointer bg-white hover:bg-gray-50"
                onClick={handleFileClick}
              >
                <input
                  type="file"
                  id="cv"
                  className="absolute inset-0 opacity-0 w-full h-full"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <span className="text-acavisa-gray text-sm md:text-base">
                  {selectedFile ? selectedFile.name : "Selecciona tu CV"}
                </span>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm">
                  Archivo seleccionado: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="mt-4">
              <Textarea
                id="message"
                rows={6}
                placeholder="Mensaje"
                className="rounded-none text-sm md:text-base"
              />
            </div>

            <Button className="bg-primary md:w-1/4 rounded-none mt-6 hover:bg-secondary text-sm md:text-base">
              Enviar
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}