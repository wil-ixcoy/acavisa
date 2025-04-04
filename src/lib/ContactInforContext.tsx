"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { sanityClient } from "./sanity";

// Función para obtener el valor de una cookie
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface ContactInfo {
  name: string;
  callcenter: string;
  whatsapp: string;
  direccion: string;
  correo_electronico: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

interface ContactInfoContextType {
  contactInfo: ContactInfo | null;
  loading: boolean;
  error: string | null;
}

const ContactInfoContext = createContext<ContactInfoContextType | undefined>(
  undefined
);

export const ContactInfoProvider = ({ children }: { children: ReactNode }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");

        if (!selectedCountryId) {
          throw new Error("No se ha seleccionado un país");
        }

        const query = `
          *[_type == "contactInfo" && country->_id == $countryId][0]{
          name,
            callcenter,
            whatsapp,
            direccion,
            correo_electronico,
            linkedin,
            instagram,
            facebook,
            tiktok
          }
        `;
        const data: ContactInfo = await sanityClient.fetch(query, {
          countryId: selectedCountryId,
        });

        if (data) {
          setContactInfo(data);
        } else {
          throw new Error(
            "No se encontró información de contacto para el país seleccionado"
          );
        }
      } catch {
        setError("No se pudo cargar la información de contacto.");
        setContactInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <ContactInfoContext.Provider value={{ contactInfo, loading, error }}>
      {children}
    </ContactInfoContext.Provider>
  );
};

export const useContactInfo = () => {
  const context = useContext(ContactInfoContext);
  if (context === undefined) {
    throw new Error("useContactInfo must be used within a ContactInfoProvider");
  }
  return context;
};
