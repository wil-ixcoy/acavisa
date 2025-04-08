"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarMenu from "./sidebarMenu";
import { client } from "../../sanity/lib/client";

interface Category {
  _id: string;
  created_at: string;
  country: string;
  countryId: string;
  category: string;
  image: string;
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split("; ");
      const countryCookie = cookies.find((cookie) => cookie.startsWith("selectedCountryId="));
      if (countryCookie) {
        const countryId = countryCookie.split("=")[1];
        setSelectedCountryId(countryId);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!selectedCountryId) {
          return;
        }

        const query = `
          *[_type == "productCategory" && country._ref == $countryId] | order(position asc) {
            "_id": _id, 
            category,
            "image": image.asset->url,
            created_at,
            "country": country->country_name,
            "countryId": country->_id
          }
        `;

        const params = { countryId: selectedCountryId };
        const data: Category[] = await client.fetch(query, params);
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, [selectedCountryId]); 

  return (
    <nav className="w-full bg-primary text-white py-3 relative z-30">
      <div className="mx-auto flex items-center justify-between px-4">
        <div
          className="bg-primary text-white border-none flex flex-col items-center justify-center px-4 py-3 rounded-md cursor-pointer hover:opacity-50 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-10 h-10 flex flex-col justify-center items-center">
            <div className="w-full h-1 bg-white mb-2"></div>
            <div className="w-full h-1 bg-white mb-2"></div>
            <div className="w-full h-1 bg-white"></div>
          </div>
          <span className="text-base font-semibold mt-1 uppercase">MENÚ</span>
        </div>

        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <ul className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium items-center">
          {categories.length > 0 ? (
            categories.map((category, index, arr) => {
              const categorySlug = category._id;

              return (
                <li
                  key={category._id}
                  className={`flex items-center ${
                    index !== arr.length - 1 ? "border-r pr-4" : ""
                  }`}
                >
                  <Link href={`/categories/${categorySlug}`} className="hover:underline">
                    {category.category}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-sm font-medium">Cargando categorías...</li>
          )}
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
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium items-center">
            {categories.length > 0 ? (
              categories.map((category, index, arr) => {
                const categorySlug = category._id;

                return (
                  <li
                    key={category._id}
                    className={`flex items-center ${
                      index !== arr.length - 1 ? "border-r pr-4" : ""
                    }`}
                  >
                    <Link href={`/categories/${categorySlug}`} className="hover:underline">
                      {category.category}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-sm font-medium">Cargando categorías...</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}