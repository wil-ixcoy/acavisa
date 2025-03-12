import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white p-6 mt-10">
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
            <Phone size={20} />
            <span>Call Center: 2231-4200</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={20} />
            <span>Whatsapp: 6025-1411</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} />
            <span>acavisa.info@acavisa.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} />
            <span>Avenida 25 av. Sur #701, San Salvador, El Salvador</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
          <span className="font-semibold">Nuestras redes</span>
          <div className="flex items-center space-x-2">
            <Phone size={20} />
            <Phone size={20} />
            <Phone size={20} />
            <span>acavisasv</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
