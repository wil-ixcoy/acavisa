"use client";

import Image from "next/image";
import { useContactInfo } from "../../lib/ContactInforContext";
import { useEffect, useState } from "react";

export default function Footer() {
  const { contactInfo, loading, error } = useContactInfo();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className="bg-primary text-white p-6 mt-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 md:gap-36">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logos/LOGOS ACAVISA_ACAVISA VERTICAL BLANCO.png"
            alt="ACAVISA"
            width={220}
            height={120}
            className="object-contain mb-2"
            unoptimized
          />
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2 text-sm md:text-md">
          <span className="font-semibold">¿Necesitas ayuda?</span>
          {isMounted && !loading ? (
            error ? (
              <span className="text-red-300">{error}</span>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/llamada-telefonica-2.png"
                    alt="llamada"
                    width={24}
                    height={24}
                    className="object-contain mb-2"
                    unoptimized
                  />
                  <span>Call Center: {contactInfo?.callcenter}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/whatsapp-2.png"
                    alt="whatsapp"
                    width={24}
                    height={24}
                    className="object-contain mb-2"
                    unoptimized
                  />
                  <span>WhatsApp: {contactInfo?.whatsapp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/correo-electronico-2.png"
                    alt="correo"
                    width={24}
                    height={24}
                    className="object-contain mb-2"
                    unoptimized
                  />
                  <span>{contactInfo?.correo_electronico}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/ubicacion-2.png"
                    alt="ubicacion"
                    width={24}
                    height={24}
                    className="object-contain mb-2"
                    unoptimized
                  />
                  <span>{contactInfo?.direccion}</span>
                </div>
              </>
            )
          ) : (
            <span>Cargando información de contacto...</span>
          )}
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2 mr-2">
          <span className="font-semibold">Nuestras redes</span>
          {isMounted && !loading ? (
            error ? (
              <span className="text-red-300">{error}</span>
            ) : (
              <div className="flex flex-col lg:flex-row items-center md:space-x-2 gap-2">
                <div className="flex items-center space-x-2">
                  {contactInfo?.linkedin && (
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/logotipo-de-linkedin.png"
                        alt="linkedin"
                        width={18}
                        height={18}
                        className="object-contain"
                        unoptimized
                      />
                    </a>
                  )}
                  {contactInfo?.instagram && (
                    <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/logotipo-de-instagram.png"
                        alt="instagram"
                        width={18}
                        height={18}
                        className="object-contain"
                        unoptimized
                      />
                    </a>
                  )}
                  {contactInfo?.facebook && (
                    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/facebook-2.png"
                        alt="facebook"
                        width={18}
                        height={18}
                        className="object-contain"
                        unoptimized
                      />
                    </a>
                  )}
                </div>
                {(contactInfo?.linkedin || contactInfo?.instagram || contactInfo?.facebook) && (
                  <span className="lg:ml-3 text-center md:text-left">acavisasv</span>
                )}
              </div>
            )
          ) : (
            <span>Cargando redes sociales...</span>
          )}
        </div>
      </div>
    </footer>
  );
}