export default function VideoComponent() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-4 mt-8 mx-4 md:mx-8 shadow-lg">
      <section className="relative w-full md:w-[220px] lg:w-[200px] h-[140px] md:h-[120px] lg:h-[120px] mb-4 md:mb-0 md:mr-4">
        <iframe
          className="w-full h-full"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6okpKTgP_Ws?si=I3bpbF_ek2swDmrI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </section>

      <section className="text-white flex flex-col w-full">
        <section className="bg-green-800 w-full h-16 flex justify-center items-center p-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left">
            ¿QUIÉNES SOMOS?
          </h1>
        </section>

        <section className="bg-green-700 w-full h-14 flex justify-center items-center p-2">
          <a
            href="#"
            className="text-base md:text-lg font-semibold hover:underline">
            ¡Mira este video!
          </a>
        </section>
      </section>
    </div>
  );
}
