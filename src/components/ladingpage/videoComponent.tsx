export default function VideoComponent() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-4 md:p-6 lg:p-8 mt-8 mx-4 md:mx-8 lg:mx-12 shadow-lg">
      {/* Contenedor del video */}
      <section className="relative w-full md:w-[220px] lg:w-[300px] h-[140px] md:h-[120px] lg:h-[180px] mb-4 md:mb-0 md:mr-4 lg:mr-6">
        <iframe
          className="w-full h-full"
          width="300"
          height="180"
          src="https://www.youtube.com/embed/6okpKTgP_Ws?si=I3bpbF_ek2swDmrI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </section>

      {/* Contenedor del texto y botón */}
      <section className="text-white flex flex-col w-full">
        <section className="bg-primary w-full h-16 lg:h-20 flex justify-center items-center p-2">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center md:text-left">
            ¿QUIÉNES SOMOS?
          </h1>
        </section>

        <section className="bg-secondary w-full h-14 lg:h-16 flex justify-center items-center p-2">
          <a
            href="#"
            className="text-base md:text-lg lg:text-xl font-semibold hover:underline"
          >
            ¡Mira este video!
          </a>
        </section>
      </section>
    </div>
  );
}