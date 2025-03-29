"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  created_at: string;
  country: string;
  category: string;
  image: string;
}

export default function Category() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const image ="https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${categoryId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error fetching category");
        }

        const data = await response.json();
        setCategoryData(data.categories);
      } catch  {
        setError("No se pudo cargar la categoría.");
        setCategoryData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);
  if (isLoading) {
    return <div>Cargando categoría...</div>;
  }

  if (error || !categoryData) {
    return <div>{error || "Categoría no encontrada."}</div>;
  }

  return (
    <section className="">
      <div className="bg-primary w-full md:w-4/6 h-auto px-4 py-2">
        <h2 className="text-xl md:text-3xl font-bold text-center text-white uppercase">
          {categoryData.category} 
        </h2>
      </div>
      <div className="w-60 md:w-72 mt-6 flex flex-col justify-center">
        <div className="w-60 md:w-72 rounded-t-lg overflow-hidden shadow-md bg-white">
          <Image
            src={categoryData.image || image}
            alt={categoryData.category}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg p-2"
          />
        </div>
        <Link
          href={`/categories/${categoryData.id}/products`}
          className="p-4 w-auto bg-white rounded-b-lg shadow-md mt-1"
        >
          <h3 className="text-primary text-lg md:text-xl text-center font-semibold uppercase">
            {categoryData.category}
          </h3>
        </Link>
      </div>
    </section>
  );
}