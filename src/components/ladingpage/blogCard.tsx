import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function BlogCard({
  title,
  description,
  imageUrl,
  link,
}: BlogCardProps) {
  return (
    <div className="max-w-xs overflow-hidden shadow-lg m-4">
      <Image
        src={imageUrl}
        alt={title}
        width={250}
        height={120}
        className="w-full h-56 object-cover"
      />
      <div>
        <div className="font-bold text-sm md:text-xl mb-2 bg-green-800 text-white flex items-center justify-center py-2">
          <p className="text-center">{title}</p>
        </div>
        <p className="text-xs md:text-lg px-4 overflow-hidden text-ellipsis whitespace-normal line-clamp-3">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link
          href={`blog/${link}`}
          className="text-xs md:text-lg inline-block text-black py-2 underline hover:no-underline"
        >
          LEER MÁS
        </Link>
      </div>
    </div>
  );
}