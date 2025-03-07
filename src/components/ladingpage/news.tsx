import Image from "next/image";

export default function News() {
  return (
    <section className="p-4 mb-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-green-600 text-white px-4 py-2">
          NOTICIAS Y EVENTOS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full h-auto p-5">
        <div className="bg-gray-300 flex items-center justify-center w-full h-[340px]">
          <span className="text-gray-700 font-semibold">Banner 1</span>
        </div>

        <div className="bg-gray-300 flex items-center justify-center w-full h-[340px]">
          <span className="text-gray-700 font-semibold">Banner 2</span>
        </div>

        <div className="bg-gray-300 flex items-center justify-center w-full h-[340px]">
          <span className="text-gray-700 font-semibold">Banner 3</span>
        </div>
      </div>
    </section>
  );
}
