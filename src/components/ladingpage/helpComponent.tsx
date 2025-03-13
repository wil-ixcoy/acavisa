import Image from "next/image";

export default function HelpComponent() {
  return (
    <div className="bg-primary p-4 flex items-center justify-center">
      <section className="bg-secondary p-4 rounded-3xl flex flex-col lg:flex-row items-center justify-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
        <span className="text-white font-semibold text-2xl text-center lg:text-left lg:w-2/4 px-4">
          ¡Estamos para ayudarte!
        </span>

        <section className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-4">
          <div className="flex items-center space-x-2 lg:w-auto">
            <Image
              src="/countries/sv.png"
              alt="Chat en Línea"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-sm font-bold">Chat en Línea</span>
          </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
            <Image
              src="/countries/sv.png"
              alt="Call Center"
              width={24}
              height={24}
              className="object-contain"
            />
            <p className="text-white text-sm"><span className="font-bold">Call Center:</span> 2231-4200</p>
          </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
            <Image
              src="/countries/sv.png"
              alt="WhatsApp"
              width={24}
              height={24}
              className="object-contain"
            />
            <p className="text-white text-sm"><span className="font-bold">WhatsApp:</span> 6025-1411</p>
            </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
            <Image
              src="/countries/sv.png"
              alt="Centro de Negocios"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white text-sm font-bold">Centro de Negocios</span>
          </div>
        </section>
      </section>
    </div>
  );
}
