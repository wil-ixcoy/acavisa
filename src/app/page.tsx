import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen bg-gray-100">
      <div
        className="w-full h-[108px] bg-cover bg-center flex justify-center shadow-lg"
        style={{ backgroundImage: "url('/background.png')" }}>
        <Image
          src="/logo-acavisa1.png"
          alt="ACAVISA"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>

      <main className="flex flex-col justify-center items-center">
        <div className="mt-10 w-80 text-center">
          <h2>
            <span className="text-3xl font-bold text-green-700">
              SELECCIONAR
            </span>{" "}
            <span className="text-3xl font-bold text-black-700">PAÍS</span>
          </h2>

          <hr className="w-[100%] my-4 border-green-700 mx-auto border-1" /> {/* Cambio aquí */}

          <div className="flex flex-col gap-4 mt-4 items-center justify-center">
            <Button className="bg-green-700 text-white flex justify-between w-full h-12 py-2 px-4 rounded-lg hover:cursor-pointer">
              <Image
                src="/countries/sv.png"
                alt="sv"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className="flex items-center gap-2 text-lg">EL SALVADOR</span>
              <span>➡</span>
            </Button>

            <Button className="bg-green-700 text-white flex justify-between w-full h-12 py-2 px-4 rounded-lg hover:cursor-pointer">
              <Image
                src="/countries/hn.png"
                alt="hn"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className="flex items-center gap-2 text-lg">HONDURAS</span>
              <span>➡</span>
            </Button>

            <Button className="bg-green-700 text-white flex justify-between w-full h-12 py-2 px-4 rounded-lg hover:cursor-pointer">
              <Image
                src="/countries/ni.png"
                alt="ni"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className="flex items-center gap-2 text-lg">NICARAGUA</span>
              <span>➡</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}