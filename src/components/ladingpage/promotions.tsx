"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { sanityClient } from "../../lib/sanity";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface SubItem {
  title: string;
  description: string;
  image: string;
  alt?: string;
  url?: string; 
}

interface Promotion {
  _id: string;
  title: string;
  description: string;
  image: string;
  alt?: string;
  subItems: SubItem[];
}

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColors = ["bg-red-600", "bg-gray-800", "bg-green-700"];

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");
        if (!selectedCountryId) {
          setPromotions([]);
          setLoading(false);
          return;
        }

        const query = `
          *[_type == "promotion" && country->_id == $countryId && startDate <= now() && endDate >= now()] | order(_createdAt desc) [0...1] {
            _id,
            title,
            description,
            "image": image.asset->url,
            "alt": image.alt,
            subItems[] {
              title,
              description,
              "image": image.asset->url,
              "alt": image.alt,
              url // Nuevo campo
            }
          }
        `;
        const data: Promotion[] = await sanityClient.fetch(query, {
          countryId: selectedCountryId,
        });

        const validPromotions = data
          .filter(
            (promo) =>
              promo.image &&
              typeof promo.image === "string" &&
              promo.image.trim() !== "" &&
              promo.image.startsWith("http")
          )
          .map((promo) => ({
            ...promo,
            subItems: promo.subItems
              .filter(
                (subItem) =>
                  subItem.image &&
                  typeof subItem.image === "string" &&
                  subItem.image.trim() !== "" &&
                  subItem.image.startsWith("http")
              )
              .slice(0, 3), // Limitar a 3 subítems
          }));

        setPromotions(validPromotions);
      } catch (error) {
        console.error("Error fetching promotions from Sanity:", error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        Cargando promociones...
      </div>
    );
  }

  if (promotions.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No hay promociones disponibles.
      </div>
    );
  }

  const subItemHeight = 100; 
  const subItemsCount = promotions[0]?.subItems.length || 0;
  const totalSubItemsHeight = subItemHeight * subItemsCount;

  return (
    <div className="w-full p-4">
      <h2 className="bg-secondary text-white px-4 py-2 text-lg font-bold inline-block uppercase">
        PROMOCIONES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="relative hidden md:block h-full">
          {promotions[0]?.image && (
            <Image
              src={promotions[0].image}
              alt={promotions[0].alt || "Promoción"}
              width={600}
              height={totalSubItemsHeight}
              style={{ height: `${totalSubItemsHeight}px` }}
              className="w-full object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-1"> 
          {promotions[0]?.subItems.map((subItem, index) => (
            <a
              key={index}
              href={subItem.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bgColors[index % bgColors.length]} flex items-center text-white cursor-pointer hover:opacity-80 transition-all h-[${subItemHeight}px]`}
            >
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src={subItem.image}
                  alt={subItem.alt || subItem.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-1 px-2 py-2">
                <h3 className="font-bold text-sm sm:text-base md:text-lg">
                  {subItem.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  {subItem.description}
                </p>
              </div>

              <div className="w-10 h-full flex items-center justify-center bg-green-800">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}