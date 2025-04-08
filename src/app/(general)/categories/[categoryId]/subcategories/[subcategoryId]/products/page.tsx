"use client";

import Product from "@/components/ladingpage/productCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sanityClient } from "../../../../../../../lib/sanity";
import HelpComponent from "@/components/ladingpage/helpComponent";

interface Product {
  _id: string;
  created_at: string;
  product_name: string;
  image: string;
  description: string;
  product_code: string;
  category: {
    _ref: string;
    _type: string;
  };
}

export default function ProductsPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const subcategoryId = params.subcategoryId as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product" && references($subcategoryId) && defined(image.asset)]{
            "_id": _id,
            created_at,
            product_name,
            "image": image.asset->url,
            description,
            product_code,
            category,
          }
        `;
        const data: Product[] = await sanityClient.fetch(query, { subcategoryId });

        if (!data || data.length === 0) {
          throw new Error("No se encontraron productos para esta subcategoría");
        }

        const validProducts = data.filter(
          (product) => product.image && typeof product.image === "string"
        );
        setProducts(validProducts);
      } catch {
        setError("No se pudieron cargar los productos.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoryId]);

  return (
    <div>
      <div className="mt-4">
        <HelpComponent />
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
          {loading ? (
            <p className="text-center col-span-full text-sm sm:text-base">
              Cargando productos...
            </p>
          ) : error ? (
            <p className="text-center col-span-full text-red-500 text-sm sm:text-base">
              {error}
            </p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Product
                key={product.product_code}
                id={product._id}
                title={product.product_name}
                image={product.image}
                categoryId={categoryId}
                subCategoryId={subcategoryId}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-sm sm:text-base">
              No hay productos en esta subcategoría.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}