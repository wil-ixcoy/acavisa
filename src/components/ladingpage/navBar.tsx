"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarMenu from "./sidebarMenu";
import { Menu } from "lucide-react"; 
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="w-full bg-primary text-white py-3 relative z-30">
      <div className=" mx-auto flex items-center justify-between px-4">
        
        <Button
          variant="outline"
          className="bg-primary text-white border-none flex items-center gap-2 px-3 py-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-5 h-5" />
          <span className="text-sm">MENÚ</span>
        </Button>

        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <ul className="hidden md:flex gap-6 ml-6 text-sm font-medium items-center">
          {[
            "Lubricantes",
            "Baterías",
            "Grasas",
            "Productos de detallado",
            "Sistemas de almacenamiento",
            "Ruedas y rodamientos",
            "Aceros",
            "Centros de servicio automotriz",
          ].map((category, index, arr) => (
            <li
              key={category}
              className={`flex items-center ${
                index !== arr.length - 1 ? "border-r pr-4" : ""
              }`}
            >
              <Link href="#" className="hover:underline">
                {category}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          className="bg-primary text-white border-none flex items-center gap-2 px-3 py-2 rounded-lg md:hidden"
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <span className="text-sm">Categorías</span>
        </Button>
      </div>

      {categoriesOpen && (
        <div className="md:hidden bg-green-900 text-white p-4 absolute w-full z-20">
          <ul className="flex flex-col gap-3">
            {[
              "Lubricantes",
              "Baterías",
              "Grasas",
              "Productos de detallado",
              "Sistemas de almacenamiento",
              "Ruedas y rodamientos",
              "Aceros",
              "Centros de servicio automotriz",
            ].map((category) => (
              <li key={category}>
                <Link href="#" className="hover:underline">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
