"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarMenu from "./sidebarMenu";

/**
 * 
 *   "Lubricantes",
            "Baterías",
            "Grasas",
            "Productos de detallado",
            "Sistemas de almacenamiento",
            "Ruedas y rodamientos",
            "Aceros",
            "Centros de servicio automotriz",
 */
interface Category {
  id: string;
  created_at: string;
  country: string;
  category: string;
  image: string;
}

interface ApiResponse {
  categories: Category[];
}
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { method: "GET" });

        if (!response.ok) {
          throw new Error("Error fetching categories");
        }

        const data: ApiResponse = await response.json();

        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setCategories([]);
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="w-full bg-primary text-white py-3 relative z-30">
      <div className="mx-auto flex items-center justify-between px-4">
        <div
          className="bg-primary text-white border-none flex flex-col items-center justify-center px-4 py-3 rounded-md cursor-pointer  hover:opacity-50 transition"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-10 h-10 flex flex-col justify-center items-center">
            <div className="w-full h-1 bg-white mb-2"></div>
            <div className="w-full h-1 bg-white mb-2"></div>
            <div className="w-full h-1 bg-white"></div>
          </div>
          <span className="text-base font-semibold mt-1 uppercase">MENÚ</span>
        </div>

        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <ul className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium items-center">
          {categories.map((category, index, arr) => {
            const categorySlug = category.id

            return (
              <li
                key={category.category}
                className={`flex items-center ${
                  index !== arr.length - 1 ? "border-r pr-4" : ""
                }`}>
                <Link
                  href={`/categories/${categorySlug}`}
                  className="hover:underline">
                  {category.category}
                </Link>
              </li>
            );
          })}
        </ul>

        <Button
          variant="outline"
          className="bg-primary text-white border-none flex items-center gap-2 px-3 py-2 rounded-lg md:hidden"
          onClick={() => setCategoriesOpen(!categoriesOpen)}>
          <span className="text-sm">Categorías</span>
        </Button>
      </div>

      {categoriesOpen && (
        <div className="md:hidden bg-green-900 text-white p-4 absolute w-full z-20">
          <ul className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium items-center">
            {[
              "Lubricantes",
              "Baterías",
              "Grasas",
              "Productos de detallado",
              "Sistemas de almacenamiento",
              "Ruedas y rodamientos",
              "Aceros",
              "Centros de servicio automotriz",
            ].map((category, index, arr) => {
              const categorySlug = category.toLowerCase().replace(/\s+/g, "-");

              return (
                <li
                  key={category}
                  className={`flex items-center ${
                    index !== arr.length - 1 ? "border-r pr-4" : ""
                  }`}>
                  <Link
                    href={`/categories/${categorySlug}`}
                    className="hover:underline">
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
