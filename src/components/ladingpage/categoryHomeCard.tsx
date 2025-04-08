"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { sanityClient } from "../../lib/sanity";

interface Category {
  _id: string;
  category: string;
  image: string;
}

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `
          *[_type == "productCategory" && defined(image.asset)]{
            "_id": _id,
            category,
            "image": image.asset->url
          }
        `;
        const data: Category[] = await sanityClient.fetch(query);

        if (!data || data.length === 0) {
          throw new Error("No se encontraron categorías");
        }

        setCategories(data);
      } catch {
        setError("No se pudieron cargar las categorías.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="w-full my-10 py-10"
      style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}>
      {loading ? (
        <p className="text-center text-white">Cargando categorías...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : categories.length > 0 ? (
        <Carousel className="w-2/4 md:w-5/6 lg:w-full max-w-4xl mx-auto">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category._id}
                className="basis-full md:basis-1/2 lg:basis-1/3">
                <Link href={`/categories/${category._id}`}>
                  <div className="relative w-full">
                    {category.image ? (
                      <Image
                        src={category.image || null}
                        alt={category.category}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <p>No se encontró la imagen</p>
                    )}
                    <div className="absolute inset-0 bg-secondary bg-opacity-60 mix-blend-multiply rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-lg font-bold uppercase text-center drop-shadow-lg px-4">
                        {category.category}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-center text-white">No hay categorías disponibles.</p>
      )}
    </div>
  );
}
