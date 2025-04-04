"use client";

import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Product from "@/components/ladingpage/productCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sanityClient } from "../../../../lib/sanity";

interface Product {
  _id: string;
  created_at: string;
  product_name: string;
  image: string; // Ahora image es directamente la URL como string
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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product" && references($categoryId) && defined(image.asset)]{
            "_id": _id,
            created_at,
            product_name,
            "image": image.asset->url, // Aseguramos que devuelva la URL
            description,
            product_code,
            category
          }
        `;
        const data: Product[] = await sanityClient.fetch(query, { categoryId });

        console.log("Productos devueltos por Sanity:", data); 

        if (!data || data.length === 0) {
          throw new Error("No se encontraron productos para esta categoría");
        }

        const validProducts = data.filter((product) => product.image && typeof product.image === "string");
        setProducts(validProducts);
      } catch (err) {
        console.error("Error fetching products from Sanity:", err);
        setError("No se pudieron cargar los productos.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}
    >
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="mx-auto pt-1 pb-13 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {loading ? (
            <p className="text-center col-span-3">Cargando productos...</p>
          ) : error ? (
            <p className="text-center col-span-3">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Product
                key={product.product_code}
                id={product.product_code}
                title={product.product_name}
                image={product.image} 
              />
            ))
          ) : (
            <p className="text-center col-span-3">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}