import Image from "next/image";

interface HistoryProps {
  image: string;
  title: string;
  text: string;
  side: "left" | "right";
}

export default function HistoryComponent({ image, title, text, side }: HistoryProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center h-full ${side === "right" ? "md:flex-row-reverse" : ""}`}>
      <div className="md:w-2/4 lg:w-3/4 flex justify-center rounded-lg">
        <Image src={image} alt={title} width={200} height={250} className="rounded-lg w-30 h-35 md:w-40 md:h-45 lg:w-60 lg:h-65" />
      </div>
      <div className="w-full md:w-1/2  p-6 ">
        <h2 className="bg-primary text-white px-4 py-2 inline-block font-bold text-md lg:text-lg">{title}</h2>
        <p className="text-gray-700 mt-2 text-justify text-sm lg:text-lg">{text}</p>
      </div>
    </div>
  );
}
