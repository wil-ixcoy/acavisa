import Image from "next/image";

export default function HelpComponent() {
  return (
    <div className="bg-green-800 p-4 flex items-center justify-center space-x-4">
      <section className="bg-green-600 p-4 rounded-3xl flex items-center justify-center space-x-4 w-full">
        <span className="text-white font-semibold text-2xl w-2/4 pl-10">
          ¡Estamos para ayudarte!
        </span>
        <section className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/countries/sv.png"
              alt="Chat en Línea"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-xs">Chat en Línea</span>
          </div>
          <span className="text-white text-4xl">|</span>
          <div className="flex items-center space-x-2">
            <Image
              src="/countries/sv.png"
              alt="Call Center"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-xs">Call Center: 2231-4200</span>
          </div>
          <span className="text-white text-4xl">|</span>
          <div className="flex items-center space-x-2">
            <Image
              src="/countries/sv.png"
              alt="WhatsApp"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-xs">WhatsApp: 6025-1411</span>
          </div>
          <span className="text-white text-4xl">|</span>
          <div className="flex items-center space-x-2">
            <Image
              src="/countries/sv.png"
              alt="Muestre Centro de Negocios"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-xs">
              Muestre Centro de Negocios
            </span>
          </div>
        </section>
      </section>
    </div>
  );
}
