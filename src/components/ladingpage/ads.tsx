import Image from "next/image";

export default function Ads() {
  return (
    <div className="w-full my-4">
      <section className="w-full h-60 md:h-80 relative">
        <Image
          src="/examples/ad.png"
          alt="Publicidad"
          layout="fill"
          className="object-cover rounded-lg shadow-md"
        />
      </section>
    </div>
  );
}
