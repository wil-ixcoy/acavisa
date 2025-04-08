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

        setCountries(data);
        setLoading(false);
      } catch {
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
      localStorage.setItem("selectedCountryId", countryId);
      document.cookie = `selectedCountryId=${countryId}; path=/; max-age=31536000`;

      setTimeout(() => {
        router.push("/home");
      }, 0);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div
        className="w-full h-[108px] bg-cover bg-center flex justify-center shadow-lg"
        style={{
          backgroundImage:
            "url('https://yekihqmbunxletzxogjn.supabase.co/storage/v1/object/sign/media/background-header%20-%20copia.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9iYWNrZ3JvdW5kLWhlYWRlciAtIGNvcGlhLnBuZyIsImlhdCI6MTc0NDE1MTI3OSwiZXhwIjoxOTAxODMxMjc5fQ.NkCVD47xzTtrxNs4f8_73oZM9UOByEjlr_Q6uhyaJtY')",
        }}>
        <Image
          src="https://yekihqmbunxletzxogjn.supabase.co/storage/v1/object/sign/media/horizontal-acavisa-full-color%20-%20copia.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9ob3Jpem9udGFsLWFjYXZpc2EtZnVsbC1jb2xvciAtIGNvcGlhLnBuZyIsImlhdCI6MTc0NDE1MTI5OSwiZXhwIjoxOTAxODMxMjk5fQ.OpTHyXCGyqkgwqCVVmXpITKYUzpReUvUVpchAbNx5G4"
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
            {!isMounted || loading ? (
              <p>Cargando países...</p>
            ) : countries.length > 0 ? (
              countries.map(({ id, country_name, country_flag }) => (
                <Button
                  key={id}
                  className="bg-secondary text-white flex justify-between w-60 h-12 py-2 px-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    handleCountrySelect(id);
                  }}>
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
                    src="https://yekihqmbunxletzxogjn.supabase.co/storage/v1/object/sign/media/arrow-select-country%20-%20copia.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9hcnJvdy1zZWxlY3QtY291bnRyeSAtIGNvcGlhLnBuZyIsImlhdCI6MTc0NDE1MTI1NSwiZXhwIjoxOTAxODMxMjU1fQ.WQsRtDnfug881j0QR-OnqBKoOuvUCBYYoFjkzXFM040"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="object-contain"
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
