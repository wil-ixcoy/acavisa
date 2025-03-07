import Image from "next/image";

export default function VideoComponent() {
  return (
    <div className="flex items-center bg-gray-100 p-4 mt-8 mx-8">
      <section className="w-54 h-30 relative mr-4">
        <Image
          src="https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Promoción"
          layout="fill"
          objectFit="cover"
          
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white p-1 rounded-sm text-xs">
          2:43
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white p-1 rounded-sm text-xs mt-6">
          JUNTOS HACEMOS HISTORIA - ACAVISA 75 AÑOS
        </div>
      </section>

      <section className=" text-white flex flex-col w-full">
        <section className="bg-green-800 w-full center h-18 flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-2">¿QUIENES SOMOS?</h1>

        </section>
        <section className="bg-green-700 w-full center h-12 flex justify-center items-center">
        <a href="#" className="text-lg font-semibold hover:underline">
          ¡Mira este video!
        </a>
        </section>
      </section>
    </div>
  );
}
