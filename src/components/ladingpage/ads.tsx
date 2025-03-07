import Image from "next/image";

export default function Ads() {
  return (
    <div>
      <section className="w-full h-90 relative mt-4 mb-6">
        <Image
          src="/examples/ad.png"
          alt="ad"
          layout="fill"
          objectFit="cover"
        />
      </section>
    </div>
  );
}
