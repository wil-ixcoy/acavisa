"use client";

import Image from "next/image";
import BlogCard from "@/components/ladingpage/blogCard";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../lib/sanity";
import Link from "next/link";

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

export default function Blog() {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [otherPosts, setOtherPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");

        if (!selectedCountryId) {
          throw new Error("No se ha seleccionado un país");
        }

        const query = `
          *[_type == "post" && defined(image.asset) && type->name in ["Blog"]] | order(created_at desc){
            "_id": _id,
            title,
            content,
            "image": image.asset->url,
            created_at,
            "category": type->name,
            "countryId": type->country->_id
          }
        `;
        const data: Post[] = await sanityClient.fetch(query);

        if (!data || data.length === 0) {
          throw new Error("No se encontraron publicaciones");
        }

        const filteredPosts = data.filter(
          (post) => post.countryId === selectedCountryId
        );

        setLatestPost(filteredPosts[0]);
        setOtherPosts(filteredPosts.slice(1));
      } catch {
        setError("No se pudieron cargar las publicaciones.");
        setLatestPost(null);
        setOtherPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
      <main>
        {loading ? (
          <p className="text-center">Cargando publicaciones...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : latestPost ? (
          <div className="relative w-full h-64 md:h-66 lg:h-86 mb-10">
            <Image
              src={latestPost.image}
              alt={latestPost.title}
              fill
              className="object-fill"
            />
            <div className="absolute inset-0 bg-secondary bg-opacity-10 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link href={`blog/${latestPost._id}`} className="bg-primary p-3">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center drop-shadow-lg px-4 uppercase">
                  {latestPost.title}
                </h2>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center">
            No hay publicaciones destacadas disponibles.
          </p>
        )}

        {otherPosts.length > 0 && (
          <div className="px-4 md:px-8 lg:px-16 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {otherPosts.map((post) => (
                <div key={post._id} className="block">
                  <BlogCard
                    title={post.title}
                    description={post.content.substring(0, 150) + "..."}
                    imageUrl={post.image}
                    link={`/${post._id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
