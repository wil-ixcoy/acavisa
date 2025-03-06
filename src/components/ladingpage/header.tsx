import { Card } from "@/components/ui/card"

export default function Header() {
  return (
    <Card className="w-full bg-gradient-to-r from-gray-100 to-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo + Texto */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-md"></div> {/* Logo Placeholder */}
          <div>
            <h1 className="text-2xl font-bold text-green-700">ACAVISA</h1>
            <p className="text-sm text-gray-600">SOMOS TU SOCIO DE NEGOCIOS</p>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md">🇸🇻</span>
            <span>EL SALVADOR</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span><strong>Call Center:</strong> 2231-4200</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span><strong>WhatsApp:</strong> 6025-1411</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
