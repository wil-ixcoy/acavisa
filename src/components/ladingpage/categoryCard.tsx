import Image from "next/image";

const categories = [
  {
    title: "GRASAS Y LUBRICANTES",
    image:
      "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "BATERÍAS",
    image:
      "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "PRODUCTOS DE DETALLADO",
    image:
      "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "SISTEMAS DE ALMACENAMIENTO",
    image:
      "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "RUEDAS Y RODOS",
    image:
      "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function CategoryCard() {
  return (
    <div
      className="w-full my-10"
      style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}>
      <section className="flex  justify-between space-x-4 py-10 px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="">
            <section className="p-0 relative">
              <Image
                src={category.image}
                alt={category.title}
                width={256}
                height={200}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-green-700 bg-opacity-60 mix-blend-multiply"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg font-bold uppercase text-center drop-shadow-lg">
                  {category.title}
                </p>
              </div>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}
