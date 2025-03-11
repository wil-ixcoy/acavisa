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
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <Image
        src={imageUrl}
        alt={title}
        width={250}
        height={120}
        className="w-full h-56 object-cover"
      />
      <div className="">
        <div className="font-bold text-xl mb-2 bg-green-800 text-white flex items-center justify-center py-2">
          <p>{title}</p>
        </div>
        <p className="text-black text-base px-4">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link
          href={`blog/${link}`}
          className="inline-block text-black py-2  underline hover:no-underline">
          LEER MÁS
        </Link>
      </div>
    </div>
  );
}
