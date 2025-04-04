"use client";

import Image from "next/image";
import { useContactInfo } from "../../lib/ContactInforContext";

export default function ChatButton() {
  const { contactInfo } = useContactInfo();

  const whatsappNumber = contactInfo?.whatsapp?.replace(/\s+/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=¡Hola! Necesito ayuda`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex items-center bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-colors z-50"
    >
      <div className="px-4 py-2 text-sm font-medium hidden sm:flex">
        <span className="font-bold">¿Necesitas ayuda? </span> ¡Chatea con nosotros!
      </div>

      <div className="bg-green-800 p-3 rounded-full">
        <Image
          src="/icons/whatsapp-2.png"
          alt="Chat"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
    </a>
  );
}
