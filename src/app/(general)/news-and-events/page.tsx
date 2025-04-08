"use client";

import Image from "next/image";

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

export default function NewsAndEvents() {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [otherPosts, setOtherPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const selectedCountryId = getCookie("selectedCountryId");

        const query = `
          *[_type == "post" && defined(image.asset) && type->name in ["Noticias", "Eventos"]] | order(created_at desc){
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

    

        const filteredPosts = data.filter(
          (post) => post.countryId === selectedCountryId
        );

     

        setLatestPost(filteredPosts[0]);
        setOtherPosts(filteredPosts.slice(1));
      } catch  {
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
    <div>
      <main className="">
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
            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {otherPosts.map((post, index) => {
                const isEven = index % 2 === 0;
                return (
                  <Link
                    href={`blog/${post._id}`}
                    key={post._id}
                    className={`group grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center transition-all duration-200 hover:bg-gray-50 rounded-lg p-4`}>
                    <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 uppercase transition-colors duration-200 group-hover:text-primary-500">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {post.content.substring(0, 150) + "..."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
