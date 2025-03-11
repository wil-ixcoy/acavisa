import Image from "next/image";
import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Title from "@/components/ladingpage/title";

interface ArticleProps {
  params: {
    id: string;
  };
}

export default function Article({ params }: ArticleProps) {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="container mx-auto p-4">
        <Title>
          <h1>{params.id}</h1>
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8">
          <div className="relative w-full h-64">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuofM315EjCsph8Bl8A9TBzRTbYaUuACt_w&s"
              alt="Metales No Ferrosos"
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">METALES NO FERROSOS</h2>
            <h3 className="text-lg font-medium mb-1">APLICACIONES</h3>
            <p className="">
              Partes y repuestos de grandes dimensiones sometidas a muy altos
              esfuerzos. Ejes para hélices de avión. Vástagos y pines. Partes de
              protección de maquinaria. Moldes de soplado y plásticos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8">
          <div className="p-4 order-2 md:order-1">
            <h2 className="text-2xl font-semibold mb-2">
              ACEROS PARA MAQUINARIA
            </h2>
            <h3 className="text-lg font-medium mb-1">APLICACIONES</h3>
            <p className="">
              Partes y repuestos de maquinaria de grandes dimensiones sometidas
              a muy altos esfuerzos. Árboles de transmisión. Barras de torsión.
              Ejes para hélices de aviones. Pernos y tuercas. Vástagos y pines.
              Brazos de dirección y muñones.
            </p>
          </div>
          <div className="relative w-full h-64 order-1 md:order-2">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuofM315EjCsph8Bl8A9TBzRTbYaUuACt_w&s"
              alt="Aceros para Maquinaria"
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
