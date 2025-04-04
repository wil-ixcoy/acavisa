"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { sanityClient } from "../../lib/sanity";

interface Post {
  _id: string;
  title: string;
  image: string;
  created_at: string;
}

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "post" && defined(image.asset)] | order(created_at desc)[0...3]{
            "_id": _id,
            title,
            "image": image.asset->url,
            created_at
          }
        `;
        const data: Post[] = await sanityClient.fetch(query);

        if (!data || data.length === 0) {
          throw new Error("No se encontraron publicaciones");
        }

        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts from Sanity:", err);
        setError("No se pudieron cargar las publicaciones.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="p-4 mb-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-secondary text-white px-4 py-2">
          NOTICIAS Y EVENTOS
        </div>
      </div>
      <div className="w-full h-auto p-5">
        {loading ? (
          <p className="text-center">Cargando publicaciones...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
            {posts.map((post) => (
              <div key={post._id} className="text-center">
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300} 
                    height={400} 
                    className="w-full h-full object-cover "
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No hay publicaciones disponibles.</p>
        )}
      </div>
    </section>
  );
}