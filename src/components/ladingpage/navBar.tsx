import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <nav className="w-full bg-green-700 text-white py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Botón de Menú */}
        <Button variant="outline" className="bg-green-800 text-white border-none flex gap-2">
          ☰ MENÚ
        </Button>

        {/* Categorías */}
        <ul className="flex gap-6 ml-6 text-sm font-medium">
          <li className="border-r pr-4">Lubricantes</li>
          <li className="border-r pr-4">Baterías</li>
          <li className="border-r pr-4">Grasas</li>
          <li className="border-r pr-4">Productos de detallado</li>
          <li className="border-r pr-4">Sistemas de almacenamiento</li>
          <li className="border-r pr-4">Ruedas y rodamientos</li>
          <li className="border-r pr-4">Aceros</li>
          <li>Centros de servicio automotriz</li>
        </ul>
      </div>
    </nav>
  );
}
