import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const countries = [
    { name: "EL SALVADOR", flag: "/countries/sv.png" },
    { name: "HONDURAS", flag: "/countries/hn.png" },
    { name: "NICARAGUA", flag: "/countries/ni.png" },
  ];

  return (
    <div className="h-screen bg-gray-100">
      <div
        className="w-full h-[108px] bg-cover bg-center flex justify-center shadow-lg"
        style={{ backgroundImage: "url('backgrounds/background-header.png')" }}>
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
            <span className="text-3xl font-bold text-secondary">SELECCIONAR</span>{" "}
            <span className="text-3xl font-bold text-black-700">PAÍS</span>
          </h2>

          <hr className="w-full my-4 border-green-700 mx-auto border-1" />

          <div className="flex flex-col gap-4 mt-4 items-center justify-center">
            {countries.map(({ name, flag }, index) => (
              <Link key={index} href="/home">
                <Button className="bg-secondary text-white flex justify-between w-60 h-12 py-2 px-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer">
                  <Image src={flag} alt={name} width={30} height={30} className="object-contain" />
                  <span className="flex items-center gap-2 text-lg">{name}</span>
                  <Image
                    src="/icons/arrow-select-country.png"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
