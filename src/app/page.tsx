"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { sanityClient } from "../lib/sanity";

interface Country {
  id: string;
  country_name: string;
  country_flag: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  };

  useEffect(() => {
    setIsMounted(true);

    const resetData = () => {
      if (typeof window !== "undefined") {
        console.log("Resetting data: Clearing cookies and localStorage");
        clearCookies();
        localStorage.clear();
      }
    };

    resetData();

    const fetchCountries = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "country"] {
            "id": _id,
            country_name,
            "country_flag": country_flag.asset->url
          }
        `);

        console.log("Fetched countries:", data);
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries from Sanity", error);
        setCountries([]);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    console.log("Current route:", pathname);
  }, [pathname]);

  const handleCountrySelect = (countryId: string) => {
    if (typeof window !== "undefined") {
      console.log("Handling country selection for ID:", countryId);
      localStorage.setItem("selectedCountryId", countryId);
      document.cookie = `selectedCountryId=${countryId}; path=/; max-age=31536000`;
      console.log("localStorage selectedCountryId:", localStorage.getItem("selectedCountryId"));
      console.log("document.cookie:", document.cookie);

      console.log("Navigating to /home with router.push");
      setTimeout(() => {
        router.push("/home");
      }, 0);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div
        className="w-full h-[108px] bg-cover bg-center flex justify-center shadow-lg"
        style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}
      >
        <Image
          src="https://acavisa.vercel.app/logos/horizontal-acavisa-full-color.png"
          alt="ACAVISA"
          width={200}
          height={80}
          className="object-contain"
          unoptimized
          onError={() => console.error("Failed to load horizontal-acavisa-full-color.png")}
        />
      </div>

      <main className="flex flex-col justify-center items-center">
        <div className="mt-10 w-80 text-center">
          <h2>
            <span className="text-3xl font-bold text-secondary">
              SELECCIONAR
            </span>{" "}
            <span className="text-3xl font-bold text-black-700">PAÍS</span>
          </h2>

          <hr className="w-full my-4 border-green-700 mx-auto border-1" />

          <div className="flex flex-col gap-4 mt-4 items-center justify-center">
            {!isMounted || loading ? (
              <p>Cargando países...</p>
            ) : countries.length > 0 ? (
              countries.map(({ id, country_name, country_flag }) => (
                <Button
                  key={id}
                  className="bg-secondary text-white flex justify-between w-60 h-12 py-2 px-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={(e) => {
                    console.log(e);
                    console.log("Button clicked for country ID:", id);
                    handleCountrySelect(id);
                  }}
                >
                  <Image
                    src={country_flag}
                    alt={country_name}
                    width={35}
                    height={50}
                    className="object-contain rounded-xs w-9 h-9"
                    onError={() => console.error(`Failed to load flag for ${country_name}`)}
                  />
                  <span className="flex items-center gap-2 text-lg">
                    {country_name}
                  </span>
                  <Image
                    src="https://acavisa.vercel.app/icons/arrow-select-country.png"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="object-contain"
                    unoptimized
                    onError={() => console.error("Failed to load arrow-select-country.png")}
                  />
                </Button>
              ))
            ) : (
              <p>No se encontraron países.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}