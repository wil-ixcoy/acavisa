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

      <main className="flex flex-col justify-center items-center ">
        <div className="p-6 mt-10 w-80 text-center">
          <h2>
            <span className="text-lg font-bold text-green-700">
              SELECCIONAR
            </span>{" "}
            <span className="text-lg font-bold text-black-700">PAÍS</span>
          </h2>
          <hr className="w-54 mx-auto my-2 border-green-700" />

          <div className="flex flex-col gap-4 mt-4">
            <Button className="bg-green-700 text-white flex justify-between w-full py-2 rounded-lg">
              <span className="flex items-center gap-2">🇸🇻 EL SALVADOR</span>
              <span>➡</span>
            </Button>

            <Button className="bg-green-700 text-white flex justify-between w-full py-2 rounded-lg">
              <span className="flex items-center gap-2">🇭🇳 HONDURAS</span>
              <span>➡</span>
            </Button>

            <Button className="bg-green-700 text-white flex justify-between w-full py-2 rounded-lg">
              <span className="flex items-center gap-2">🇳🇮 NICARAGUA</span>
              <span>➡</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
