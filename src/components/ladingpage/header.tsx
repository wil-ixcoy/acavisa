"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/ladingpage/searchBar";
import Link from "next/link";
import { useContactInfo } from "../../lib/ContactInforContext";

export default function Header() {
  const { contactInfo, loading, error } = useContactInfo();

  return (
    <Card
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-6 mt-3">
        <section className="flex items-center lg:mr-20">
          <Link href="/home">
            <Image
              src="/logos/horizontal-acavisa-full-color.png"
              alt="ACAVISA"
              width={250}
              height={120}
              className="object-contain"
            />
          </Link>
        </section>

        <section className="lg:ml-20 flex flex-col items-center lg:items-end mt-3 lg:mt-0 lg:mr-8 text-sm text-deep-gray">
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-1 text-primary">
              <Image
                src={contactInfo?.country_flag}
                alt="sv"
                width={32}
                height={30}
                className="object-contain"
              />
              <span className="font-bold uppercase">{contactInfo?.name}</span>
            </div>

            <span className="hidden lg:block text-primary">|</span>

            <div className="flex items-center space-x-1 text-primary">
              <Image
                src="/icons/llamada-telefonica-full-collor.png"
                alt="call"
                width={22}
                height={60}
                className="object-contain mr-4"
              />
              {loading ? (
                <span>Cargando...</span>
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <span className="font-bold">
                  <strong>Call Center:</strong>{" "}
                  {contactInfo?.callcenter}
                </span>
              )}
            </div>

            <span className="hidden lg:block text-primary">|</span>

            <div className="flex items-center space-x-1 text-primary">
              <Image
                src="/icons/whatsapp.png"
                alt="whatsApp"
                width={22}
                height={60}
                className="object-contain mr-4"
              />
              {loading ? (
                <span>Cargando...</span>
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <span className="font-bold">
                  <strong>WhatsApp:</strong>{" "}
                  {contactInfo?.whatsapp}
                </span>
              )}
            </div>
          </div>

          <div className="w-full mt-2 lg:mt-3">
            <SearchBar />
          </div>
        </section>
      </div>
    </Card>
  );
}