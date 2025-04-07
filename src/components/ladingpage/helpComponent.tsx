import Image from "next/image";

export default function HelpComponent() {
  return (
    <div className="bg-primary p-4 flex items-center justify-center">
      <section className="bg-secondary p-4 rounded-3xl flex flex-col lg:flex-row items-center justify-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
        <span className="text-white font-semibold text-2xl text-center lg:text-left lg:w-2/4 px-4">
          ¡Estamos para ayudarte!
        </span>

        <section className="flex flex-wrap lg:flex-nowrap justify-start  md:justify-center md:items-center gap-4">
          <div className="flex items-center space-x-2 lg:w-auto">
            <div
              className=" p-2 md:p-3 xl:p-3.5 w-9 h-10 md:w-10 md:h-12 lg:w-16 lg:h-12 xl:w-13 xl:h-14 bg-cover bg-center mr-6 relative"
              style={{ backgroundImage: "url('/icons/rombo.svg')" }}>
              <Image
                src="/public/icons/charla-2.png"
                alt="Chat en Línea"
                width={38}
                height={38}
                className="object-contain absolute  w-8.5  md:w-10 xl:w-11"
              />
            </div>
            <span className="text-white text-sm font-bold">Chat en Línea</span>
          </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
            <div
              className=" p-2 md:p-3 xl:p-3.5 w-9 h-10 md:w-10 md:h-12 lg:w-16 lg:h-12 xl:w-13 xl:h-14 bg-cover bg-center mr-6 relative"
              style={{ backgroundImage: "url('/icons/rombo.svg')" }}>
              <Image
                src="/public/icons/llamada-telefonica-2.png"
                alt="llamda"
                width={38}
                height={38}
                className="object-contain absolute  w-7.5  md:w-8.5 xl:w-9.5"
              />
            </div>
            <p className="text-white text-sm">
              <span className="font-bold">Call Center:</span> 2231-4200
            </p>
          </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
            <div
              className=" p-2 md:p-3 xl:p-3.5 w-9 h-10 md:w-10 md:h-12 lg:w-16 lg:h-12 xl:w-13 xl:h-14 bg-cover bg-center mr-6 relative"
              style={{ backgroundImage: "url('/icons/rombo.svg')" }}>
              <Image
                src="/public/icons/whatsapp-2.png"
                alt="whatsApp"
                width={38}
                height={38}
                className="object-contain absolute w-7.5  md:w-8.5 xl:w-9.5"
              />
            </div>
            <p className="text-white text-sm">
              <span className="font-bold">WhatsApp:</span> 6025-1411
            </p>
          </div>

          <span className="hidden lg:block text-white text-4xl">|</span>

          <div className="flex items-center space-x-2 lg:w-auto">
          <div
              className=" p-2 md:p-3 xl:p-2.5 w-9 h-10 md:w-10 md:h-12 lg:w-16 lg:h-12 xl:w-13 xl:h-14 bg-cover bg-center mr-6 relative"
              style={{ backgroundImage: "url('/icons/rombo.svg')" }}>
              <Image
                src="/public/icons/ubicacion-2.png"
                alt="ubicacion"
                width={38}
                height={38}
                className="object-contain absolute  w-8.5  md:w-10 xl:w-11"
              />
            </div>
            <span className="text-white text-sm font-bold">
              Centro de Negocios
            </span>
          </div>
        </section>
      </section>
    </div>
  );
}
