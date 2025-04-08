import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  image: string;
  title: string;
  id: string;
  categoryId: string;
}

export default function Product({
  image,
  title,
  id,
  categoryId,
}: ProductProps) {
  return (
    <section className="">
      <div className="w-72 mt-6 flex flex-col justify-center">
        <div className="w-72 rounded-t-lg overflow-hidden shadow-md bg-white px-16">
          <Image
            src={image}
            alt={id}
            width={300}
            height={200}
            className="w-full h-48 fill rounded-t-lg p-2"
          />
        </div>

        <div className="p-4 w-auto bg-white rounded-b-lg shadow-md mt-1 h-23">
          <Link href={`/categories/${categoryId}/products/${id}`}>
            <h3 className="text-primary text-lg md:text-xl text-center font-semibold uppercase hover:underline">
              {title}
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}