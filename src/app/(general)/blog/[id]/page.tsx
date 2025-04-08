"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../../lib/sanity";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
  category: string;
  countryId: string;
}

interface ArticleProps {
  params: Promise<{ id: string }>;
}

export default function Article({ params }: ArticleProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params;
        const selectedCountryId = getCookie("selectedCountryId");

        if (!selectedCountryId) {
          throw new Error("No se ha seleccionado un país");
        }

        const query = `
          *[_type == "post" && _id == $id][0]{
            "_id": _id,
            title,
            content,
            "image": image.asset->url,
            created_at,
            "category": type->name,
            "countryId": type->country->_id
          }
        `;
        const data: Post = await sanityClient.fetch(query, { id });

        if (!data) {
          throw new Error("No se encontró la publicación");
        }

        if (data.countryId !== selectedCountryId) {
          throw new Error(
            "Esta publicación no está disponible para el país seleccionado"
          );
        }

        setPost(data);
      } catch {
        setError("No se pudo cargar la publicación.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
      <main className="">
        {loading ? (
          <p className="text-center text-sm sm:text-base">
            Cargando publicación...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ) : post ? (
          <>
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-84 mb-6 sm:mb-8 md:mb-10 rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-fill"
              />
              <div className="absolute inset-0 mix-blend-multiply rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
            <h1 className=" text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center drop-shadow-lg px-2 sm:px-4 uppercase">
              {post.title}
            </h1>

            <div className="grid text-justify mx-20">
              <div className="order-2 md:order-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {post.category}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {post.content}
                </p>
                <Link
                  href="/blog"
                  className="mt-8 block text-primary hover:text-black">
                  Regresar
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm sm:text-base">
            No se encontró la publicación.
          </p>
        )}
      </main>
    </div>
  );
}
