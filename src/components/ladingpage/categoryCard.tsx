"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const formatCategoryName = (slug: string) => {
  return decodeURIComponent(slug).replace(/-/g, " ");
};

export default function Category() {
  const params = useParams();
  const categoryId = params.categoryId as string; 

  const image =
    "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const categoryName = formatCategoryName(categoryId);

  return (
    <section className="">
      <div className="bg-primary w-full md:w-4/6 h-auto px-4 py-2 ">
        <h2 className="text-xl md:text-3xl font-bold text-center text-white uppercase">
          {categoryName}
        </h2>
      </div>
      <div className="w-60 md:w-72 mt-6 flex flex-col justify-center">
        <div className="w-60 md:w-72 rounded-t-lg overflow-hidden shadow-md bg-white">
          <Image
            src={image}
            alt={categoryName}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg p-2"
          />
        </div>
        <Link
          href={`/categories/${categoryId}/products`}
          className="p-4 w-auto bg-white rounded-b-lg shadow-md mt-1"
        >
          <h3 className="text-primary text-lg md:text-xl text-center font-semibold uppercase">
            {categoryName}
          </h3>
        </Link>
      </div>
    </section>
  );
}