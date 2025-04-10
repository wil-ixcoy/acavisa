import Title from "@/components/ladingpage/title";
import HistoryComponent from "@/components/ladingpage/historyComponent";
import Timeline from "@/components/ladingpage/timeline";

const historyData = [
  {
    title: "1949",
    image: "/history/foto1.jpg",
    text: "Nuestra historia comienza el “21 de abril de 1949”, cuando Don CARLOS AVILÉS, fundó uno de los primeros y más respetados consorcios de El Salvador bajo el nombre de CARLOS AVILÉS, comercializando café en el mercado internacional. Obteniendo la representación de los tractores livianos Mayrath, de la Flota Mercante Grancolombiana y T&J Harrison (Harrison Line).",
    side: "left",
  },
  {
    title: "1960",
    image: "/history/foto4.jpg",
    text: "A principios de los años 60, obtiene la representación, fabricación y distribución exclusiva de ángulos ranurados DEXION, así como la representación y distribución de lubricantes CASTROL, aceros suecos PALME de El Salvador, navajas y cuchillos VICTORINOX, bombas de riego agrícola BIRCHMEIER, boquillas DELAVAN, silos para almacenamiento de granos READ STEEL, maquinaria industrial y tornos EMCO, rodos FLEXELLO, entre otros.",
    side: "right",
  },
  {
    title: "1964",
    image: "/history/foto3.jpg",
    text: "En 1964, abre el primer centro de servicios para vehículos denominado AUTO SERVICIO CASTROL DE CARLOS AVILÉS. A finales de los años 70 cambian su nombre por LUBRICENTRO CASTROL.",
    side: "left",
  },
  {
    title: "1979",
    image: "/history/foto6.jpg",
    text: "En 1979, CARLOS AVILÉS se transforma en ACERO CENTRO AVILÉS, SOCIEDAD ANÓNIMA DE CAPITAL VARIABLE (ACAVISA DE C.V.) empresa que da continuidad a las líneas de negocios: Automotriz, Industrial y Servicios.",
    side: "right",
  },
  {
    title: "2003",
    image: "/history/foto7.jpg",
    text: "En 2003, salimos de las fronteras salvadoreñas e iniciamos operaciones en la República de Honduras, bajo el nombre de ACAVISA HONDURAS, S.A.",
    side: "left",
  },
  {
    title: "2010",
    image: "/history/foto8.jpg",
    text: "En 2010 pasan a ser AUTOCHECK SERVICE CENTER, con operaciones en El Salvador y Honduras",
    side: "right",
  },
];

export default function History() {
  return (
    <div>
      <Title>
        <p>Historia</p>
      </Title>
      <main className="w-full mx-auto py-10 px-6">
        <Timeline>
          {historyData.map((event, index) => (
            <HistoryComponent
              key={index}
              {...event}
              side={event.side as "left" | "right"}
            />
          ))}
        </Timeline>
      </main>

      <section className="flex flex-col gap-4 w-3/4 justify-center items-center  text-justify mx-auto mt-6 text-xs md:text-md lg:text-lg">
        <p>
          Desde sus inicios, ACAVISA ha mantenido su empuje comercial,
          introduciendo nuevos productos, mejorando sus sistemas de
          comercialización, asesoría, distribución y servicios. Y lo más
          importante, mejorando la calidad de vida de su Capital Humano.
        </p>
        <p>
          Actualmente contamos con la representación y distribución exclusiva
          para El Salvador y Honduras de lubricantes CASTROL, productos para la
          limpieza y cuidado de vehículos MEGUIAR’S, ruedas y rodos COLSON,
          aceros especiales UDDEHOLM y nuestras marcas propias en sistemas de
          almacenamiento HABIL-ES, en baterías para vehículos automotores
          TECNOVOLT y grasas e hidraúlicos TECNO FLUID.
        </p>
        <p>
          Más de 75 años dedicados al trabajo, difícilmente se pueden resumir.
          Lo cierto es que la vida de un gran hombre se sigue escribiendo con
          mucho amor y esfuerzo.
        </p>
        <p>
          El legado de CARLOS AVILÉS, sigue vivo y su filosofía de trabajo
          basada en la integridad, responsabilidad y espíritu de servicio, son
          los principios que a través del tiempo rigen nuestro trabajo diario.
        </p>
      </section>

      <section className="flex flex-col md:flex-row w-3/4 mx-auto gap-6 mt-4">
        <div className="p-10 w-full md:w-1/2 bg-primary text-white">
          <h2 className="text-center text-xl font-bold">MISIÓN</h2>
          <p className="text-justify text-xs md:text-md lg:text-lg">
            Somos un equipo profesional comprometido en generarle una propuesta
            de valor a cada cliente, a través de una experiencia memorable con
            soluciones rápidas, eficientes y eficaces.
          </p>
        </div>
        <div className="p-10 w-full md:w-1/2 bg-verde-secundario text-white">
          <h2 className="text-center text-xl font-bold">VISIÓN</h2>
          <p className="text-justify text-xs md:text-md lg:text-lg">
            Ser el mejor comercializador regional de productos y servicios
            automotrices e industriales, anticipándose a las necesidades y
            expectativas de los consumidores más exigentes, ofreciendo
            soluciones innovadoras, contribuyendo al crecimiento, desarrollo y
            sostenibilidad de todas las partes interesadas.
          </p>
        </div>
      </section>
    </div>
  );
}
