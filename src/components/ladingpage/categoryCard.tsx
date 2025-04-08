"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { sanityClient } from "../../lib/sanity";

interface Subcategory {
  _id: string;
  subcategory_name: string;
  image: string;
  created_at: string;
}

interface Category {
  _id: string;
  category: string;
}

export default function Category() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryQuery = `
          *[_type == "productCategory" && _id == $categoryId][0] {
            _id,
            category
          }
        `;
        const category: Category | null = await sanityClient.fetch(
          categoryQuery,
          { categoryId }
        );

        if (!category) {
          throw new Error("Categoría no encontrada");
        }

        setCategoryData(category);

        const subcategoryQuery = `
          *[_type == "subcategory" && references($categoryId)] | order(created_at asc) {
            _id,
            subcategory_name,
            "image": image.asset->url,
            created_at
          }
        `;

        const subcategoriesData: Subcategory[] = await sanityClient.fetch(
          subcategoryQuery,
          { categoryId }
        );

        if (!subcategoriesData || subcategoriesData.length === 0) {
          throw new Error(
            "No se encontraron subcategorías para esta categoría."
          );
        }

        setSubcategories(subcategoriesData);
      } catch {
        setError("No se pudieron cargar los datos.");
        setSubcategories([]);
        setCategoryData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (error || !categoryData || subcategories.length === 0) {
    return <div>{error || "No se encontraron datos."}</div>;
  }

  return (
    <section>
      <div className="bg-primary w-full md:w-4/6 h-auto px-4 py-2">
        <h2 className="text-xl md:text-3xl font-bold text-center text-white uppercase">
          {categoryData.category}
        </h2>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="w-60 md:w-72 flex flex-col justify-center">
            <div className="w-60 md:w-72 rounded-t-lg overflow-hidden shadow-md bg-white">
              <Image
                src={subcategory.image}
                alt={subcategory.subcategory_name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg p-2"
              />
            </div>
            <Link
              href={`/categories/${categoryId}/subcategories/${subcategory._id}/products`}
              className="p-4 w-auto bg-white rounded-b-lg shadow-md mt-1">
              <h3 className="text-primary text-lg md:text-xl text-center font-semibold uppercase">
                {subcategory.subcategory_name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
