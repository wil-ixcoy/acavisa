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
      <div className="w-3/4 flex justify-center">
        <Image src={image} alt={title} width={260} height={350} className="" />
      </div>
      <div className="w-1/2  p-6 ">
        <h2 className="bg-primary text-white px-4 py-2 inline-block font-bold text-lg">{title}</h2>
        <p className="text-gray-700 mt-2">{text}</p>
      </div>
    </div>
  );
}
