"use client";

import Image from "next/image";
import Ads from "@/components/ladingpage/ads";
import CategoryCard from "@/components/ladingpage/categoryHomeCard";
import HelpComponent from "@/components/ladingpage/helpComponent";
import PromotionsSection from "@/components/ladingpage/promotions";
import VideoComponent from "@/components/ladingpage/videoComponent";
import News from "@/components/ladingpage/news";
import ChatButton from "@/components/ladingpage/chatUs";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../lib/sanity";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface ContactInfo {
  callcenter: string;
  whatsapp: string;
  direccion: string;
  correo_electronico: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export default function Home() {
  const [, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");

        if (!selectedCountryId) {
          console.error("No se ha seleccionado un país");
          return;
        }

        const query = `
          *[_type == "contactInfo" && country->_id == $countryId][0]{
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
          localStorage.setItem("contactInfo", JSON.stringify(data));
          setContactInfo(data);
        } else {
          console.error(
            "No se encontró información de contacto para el país seleccionado"
          );
        }
      } catch (err) {
        console.error("Error fetching contact info from Sanity:", err);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div>
      <header></header>
      <ChatButton />
      <Ads />
      <HelpComponent />
      <CategoryCard />
      <PromotionsSection />
      <VideoComponent />

      <section className="p-4 mb-6 mt-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-secondary text-white px-4 py-2">
            NUESTRAS MARCAS
          </div>
        </div>
        <div className="w-full h-auto bg-gray-200 p-5">
          <Image
            src="public/examples/brands.png"
            alt="Marcas"
            width={600}
            height={300}
            className="w-full h-[240px] object-cover"
          />
        </div>
      </section>
      <News />
    </div>
  );
}
