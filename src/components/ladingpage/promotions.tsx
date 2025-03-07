import Image from "next/image";
import { ChevronRight } from "lucide-react";

const promotions = [
  {
    title: "¡Nuestras Baterías!",
    description: "Conoce nuestra variedad",
    bgColor: "bg-red-600",
    icon: "🔋",
  },
  {
    title: "¡Viaja Seguro!",
    description: "Más vida útil",
    bgColor: "bg-gray-800",
    icon: "🚗",
  },
  {
    title: "Calidad y Garantía",
    description: "Conoce los beneficios de usar Tecnovolt",
    bgColor: "bg-green-800",
    icon: "✅",
  },
];

export default function PromotionsSection() {
  return (
    <div className="w-full p-4">
      <h2 className="bg-green-700 text-white px-4 py-2 text-lg font-bold inline-block uppercase">
        PROMOCIONES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
        <div className="relative">
          <Image
            src="https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Reemplázalo con la imagen correcta
            alt="Promoción"
            width={600}
            height={300}
            className="w-full h-100 shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-between">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className={`${promo.bgColor} flex items-center text-white shadow-lg cursor-pointer hover:opacity-80 transition`}>
              <span className="text-3xl mr-4">{promo.icon}</span>

              <div className="flex-1">
                <h3 className="font-bold text-lg">{promo.title}</h3>
                <p className="text-sm">{promo.description}</p>
              </div>

              <div className="w-7 h-32 flex items-center justify-center bg-green-700">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
