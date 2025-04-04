"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { sanityClient } from "../../lib/sanity";
import debounce from "lodash.debounce";

interface Product {
  _id: string;
  product_name: string;
  product_code: string;
  categoryId: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchProducts = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setProducts([]);
        setShowResults(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setShowResults(false);

      try {
        const normalizedTerm = normalizeText(term);
        const query = `
          *[_type == "product" && lower(product_name) match $searchTerm]{
            "_id": _id,
            product_name,
            product_code,
            "categoryId": category->_id
          }
        `;
        const params = { searchTerm: `*${normalizedTerm.replace(/s$/, "(s)?")}*` };
        const results: Product[] = await sanityClient.fetch(query, params);

        if (results.length > 0) {
          setProducts(results);
          setShowResults(true);
        } else {
          setError("No se encontraron productos con ese nombre");
          setProducts([]);
          setShowResults(false);
        }
      } catch (err) {
        console.error("Error searching products:", err);
        setError("Ocurrió un error al buscar productos");
        setProducts([]);
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    }, 300), 
    []
  );

  useEffect(() => {
    searchProducts(searchTerm);
    return () => {
      searchProducts.cancel();
    };
  }, [searchTerm, searchProducts]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && products.length > 0) {
      handleSelectProduct(products[0]);
    }
  };

  const handleSelectProduct = (product: Product) => {
    if (product.categoryId && product.product_code) {
      router.push(`/categories/${product.categoryId}/products`);
      setShowResults(false);
      setSearchTerm("");
      setProducts([]);
    } else {
      setError("No se pudo redirigir: información del producto incompleta");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full flex justify-center py-3 px-2 relative">
      <div className="w-full max-w-2xl flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm transition-all focus-within:border-gray-500 relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-black-proces outline-none bg-transparent px-2 border-none focus:ring-0 placeholder-gray-500"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="ghost"
          size="icon"
          className="p-1 sm:p-2"
          disabled={loading}
        >
          <Image
            src="/icons/search.png"
            alt="search"
            width={20}
            height={60}
            className="object-contain w-6 h-6 sm:w-7 sm:h-7 text-deep-gray hover:text-black transition-colors"
          />
        </Button>
      </div>
  
      {error && (
        <div className="absolute top-full left-0 right-0 text-center text-red-500 text-sm z-50 mt-2">
          {error}
        </div>
      )}
      {loading && (
        <div className="absolute top-full left-0 right-0 text-center text-gray-500 text-sm z-50 mt-2">
          Buscando...
        </div>
      )}
  
      {showResults && products.length > 0 && (
        <div
          className="absolute top-5/6 left-0 w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-2 max-h-60 overflow-y-auto"
        >
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li
                key={product._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black-proces"
                onClick={() => handleSelectProduct(product)}
              >
                {product.product_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
}