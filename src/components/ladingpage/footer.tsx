import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-6 mt-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 md:gap-36">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logos/LOGOS ACAVISA_ACAVISA VERTICAL BLANCO.png"
            alt="ACAVISA"
            width={220}
            height={120}
            className="object-contain mb-2"
          />
          <span className="text-sm">SOMOS TU SOCIO DE NEGOCIOS</span>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
          <span className="font-semibold">¿Necesitas ayuda?</span>
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/llamada-telefonica-2.png"
              alt="llamada"
              width={24}
              height={24}
              className="object-contain mb-2"
            />{" "}
            <span>Call Center: 2231-4200</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/whatsapp-2.png"
              alt="llamada"
              width={24}
              height={24}
              className="object-contain mb-2"
            />{" "}
            <span>Whatsapp: 6025-1411</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/correo-electronico-2.png"
              alt="llamada"
              width={24}
              height={24}
              className="object-contain mb-2"
            />{" "}
            <span>acavisa.info@acavisa.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/ubicacion-2.png"
              alt="llamada"
              width={24}
              height={24}
              className="object-contain mb-2"
            />{" "}
            <span>Avenida 25 av. Sur #701, San Salvador, El Salvador</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2 mr-2">
  <span className="font-semibold">Nuestras redes</span>

  <div className="flex flex-col lg:flex-row items-center md:space-x-2 gap-2">
    <div className="flex items-center space-x-2">
      <Image
        src="/icons/logotipo-de-linkedin.png"
        alt="linkedin"
        width={18}
        height={18}
        className="object-contain"
      />
      <Image
        src="/icons/logotipo-de-instagram.png"
        alt="instagram"
        width={18}
        height={18}
        className="object-contain"
      />
      <Image
        src="/icons/facebook-2.png"
        alt="facebook"
        width={18}
        height={18}
        className="object-contain"
      />
    </div>

    <span className=" lg:ml-3 text-center md:text-left">acavisasv</span>
  </div>
</div>


        
      </div>
    </footer>
  );
}
