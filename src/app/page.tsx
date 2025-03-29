"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Country {
  id: string;
  created_at: string;
  country_name: string;
  country_flag: string;
  country_code: string;
}

interface ApiResponse {
  countries: Country[];
}

export default function Home() {
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/countries");

        if (!response.ok) {
          throw new Error("Error fetching countries");
        }

        const data: ApiResponse = await response.json();

        if (Array.isArray(data.countries)) {
          setCountries(data.countries);
        } else {
          setCountries([]);
        }
        setLoading(false);
      } catch {
        setCountries([]);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelect = (countryId: string) => {
    localStorage.setItem("selectedCountryId", countryId);
    document.cookie = `selectedCountryId=${countryId}; path=/; max-age=31536000`;
  };

  return (
    <div className="h-screen bg-gray-100">
      <div
        className="w-full h-[108px] bg-cover bg-center flex justify-center shadow-lg"
        style={{ backgroundImage: "url('backgrounds/background-header.png')" }}
      >
        <Image
          src="/logos/horizontal-acavisa-full-color.png"
          alt="ACAVISA"
          width={200}
          height={80}
          className="object-contain"
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
            {loading ? (
              <p>Cargando países...</p>
            ) : countries.length > 0 ? (
              countries.map(({ id, country_name, country_flag }) => (
                <Link key={id} href="/home">
                  <Button
                    className="bg-secondary text-white flex justify-between w-60 h-12 py-2 px-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleCountrySelect(id)}
                  >
                    <Image
                      src={country_flag}
                      alt={country_name}
                      width={35}
                      height={50}
                      className="object-contain rounded-xs w-9 h-9"
                    />
                    <span className="flex items-center gap-2 text-lg">
                      {country_name}
                    </span>
                    <Image
                      src="/icons/arrow-select-country.png"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </Button>
                </Link>
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