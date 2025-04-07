"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { sanityClient } from "../../lib/sanity";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface Ad {
  _id: string;
  image: string;
  alt?: string;
  link?: string;
}

export default function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");
        if (!selectedCountryId) {
          setAds([]);
          setLoading(false);
          return;
        }

        const query = `
          *[_type == "headerAd" && country->_id == $countryId && startDate <= now() && endDate >= now() && defined(image.asset) && image.asset->url != ""]{
            _id,
            "image": image.asset->url,
            "alt": image.alt,
            link
          }
        `;
        const data: Ad[] = await sanityClient.fetch(query, {
          countryId: selectedCountryId,
        });

        const validAds = data.filter(
          (ad) =>
            ad.image &&
            typeof ad.image === "string" &&
            ad.image.trim() !== "" &&
            ad.image.startsWith("http") 
        );

        setAds(validAds);
      } catch (error) {
        console.error("Error fetching ads from Sanity:", error);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const goToAd = (index: number) => {
    setCurrentAdIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full my-4 text-center text-gray-500">
        Cargando anuncios...
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="w-full my-4 text-center text-gray-500">
        No hay anuncios disponibles.
      </div>
    );
  }

  return (
    <div className="w-full my-4">
      <section className="w-full h-60 md:h-80 relative overflow-hidden">
        {ads.map((ad, index) => {
          if (!ad.image || ad.image.trim() === "" || !ad.image.startsWith("http")) {
            return null;
          }

          return (
            <a
              key={ad._id}
              href={ad.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
                index === currentAdIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={ad.image}
                alt={ad.alt || "Publicidad"}
                layout="fill"
                className="object-cover rounded-lg shadow-md"
              />
            </a>
          );
        })}

        {ads.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAd(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentAdIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}