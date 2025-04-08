"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../../../../../../lib/sanity";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  product_name: string;
  description: string;
  image: string;
  alt?: string;
  product_code: string;
  category: string;
  categoryId: string;
  subcategory: string;
  subcategoryId: string;
  created_at: string;
}

export default function Product() {
  const params = useParams();
  const productId = params.productId as string;
  const categoryId = params.categoryId as string;
  const subcategoryId = params.subcategoryId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `
          *[_type == "product" && _id == $productId][0]{
            "_id": _id,
            product_name,
            description,
            "image": image.asset->url,
            "alt": image.alt,
            product_code,
            "category": subcategory->category->category,
            "categoryId": subcategory->category->_id,
            "subcategory": subcategory->subcategory_name,
            "subcategoryId": subcategory->_id,
            created_at
          }
        `;
        const data: Product = await sanityClient.fetch(query, { productId });

        setProduct(data);
      } catch {
        setError("No se pudo cargar el producto.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
      <main className="max-w-5xl mx-auto py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
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
            {/* Breadcrumbs */}
            <nav className="my-4 text-gray-600 text-sm sm:text-base">
              <Link
                href={`/categories/${categoryId}/subcategories`}
                className="underline">
                {product.category}
              </Link>{" "}
              &gt;{" "}
              <Link
                href={`/categories/${categoryId}/subcategories/${subcategoryId}/products`}
                className="underline">
                {product.subcategory}
              </Link>{" "}
              &gt; <span>{product.product_name}</span>
            </nav>

            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 sm:mb-8 md:mb-10 rounded-lg overflow-hidden border-2">
              <Image
                src={product.image}
                alt={product.alt || product.product_name}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                priority
              />
            </div>

            <h1 className="text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center drop-shadow-lg px-2 sm:px-4 uppercase">
              {product.product_name}
            </h1>

            <div className="grid gap-6 text-justify mx-4 sm:mx-6 md:mx-8 mt-6">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {product.category} &gt; {product.subcategory}
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
                  href={`/categories/${categoryId}/subcategories/${subcategoryId}/products`}
                  className="mt-4 inline-block text-primary hover:text-black underline text-sm sm:text-base">
                  Regresar a los productos
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
