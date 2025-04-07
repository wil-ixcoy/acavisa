"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../../../../lib/sanity";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface Product {
  _id: string;
  product_name: string;
  description: string;
  image: string;
  alt?: string;
  product_code: string;
  category: string;
  categoryId: string;
  created_at: string;
  countryId?: string;
}

interface ProductProps {
  params: Promise<{ productId: string }>;
}

export default function Product({ params }: ProductProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { productId } = await params;

        console.log("productId:", productId);
        const selectedCountryId = getCookie("selectedCountryId");

        if (!selectedCountryId) {
          throw new Error("No se ha seleccionado un país");
        }

        const query = `
          *[_type == "product" && _id == $productId][0]{
            "_id": _id,
            product_name,
            description,
            "image": image.asset->url,
            "alt": image.alt,
            product_code,
            "category": category->name,
            "categoryId": category->_id, // Obtener el ID de la categoría
            created_at,
            "countryId": category->country->_id
          }
        `;
        const data: Product = await sanityClient.fetch(query, { productId });

        if (!data) {
          throw new Error("No se encontró el producto");
        }

        if (data.countryId && data.countryId !== selectedCountryId) {
          throw new Error(
            "Este producto no está disponible para el país seleccionado"
          );
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product from Sanity:", err);
        setError("No se pudo cargar el producto.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}
    >
      <main className="">
        {loading ? (
          <p className="text-center text-sm sm:text-base">
            Cargando producto...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ) : product ? (
          <>
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-84 mb-6 sm:mb-8 md:mb-10 rounded-lg">
              <Image
                src={product.image}
                alt={product.alt || product.product_name}
                fill
                className="object-fill"
              />
              <div className="absolute inset-0 mix-blend-multiply rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>

            <h1 className="text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center drop-shadow-lg px-2 sm:px-4 uppercase">
              {product.product_name}
            </h1>

            <div className="grid text-justify mx-4 sm:mx-10 md:mx-20">
              <div className="order-2 md:order-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {product.category}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  {product.description}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  <strong>Código del producto:</strong> {product.product_code}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  <strong>Fecha de creación:</strong>{" "}
                  {new Date(product.created_at).toLocaleDateString()}
                </p>
                <Link
                  href={`/categories/${product.categoryId}/products`}
                  className="mt-8 block text-primary hover:text-black"
                >
                  Regresar
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm sm:text-base">
            No se encontró el producto.
          </p>
        )}
      </main>
    </div>
  );
}