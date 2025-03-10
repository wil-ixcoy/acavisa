"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarMenu from "./sidebarMenu";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-green-700 text-white py-3 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center">
        <Button
          variant="outline"
          className="bg-green-800 text-white border-none flex gap-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰ MENÚ
        </Button>

        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <ul className="flex gap-6 ml-6 text-sm font-medium items-center">
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
      </div>
    </nav>
  );
}
