import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Image from "next/image";
import Footer from "@/components/ladingpage/footer";
import Title from "@/components/ladingpage/title";

export default function History() {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>
      <Title>
        <p>Historia</p>
      </Title>
      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <div className="flex justify-start">
            <Image
              src="/logos/logo-acavisa1.png"
              alt="Historia"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="text-gray-700">
            <h2 className="font-bold text-black text-2xl">Líderes en el mercado</h2>
            <p className="mt-4">
              Contamos con 75 años de experiencia, siendo líderes en el mercado
              de la industria. Somos reconocidos por nuestros productos de
              calidad, servicio eficiente y mejora continua. Somos tu socio de
              negocios.La mejor opción en el mercado de sistemas de
              almacenamiento y el primero en distribuir la marca Dexion en El
              Salvador.
            </p>
            <p className="mt-4">
              También reconocidos por nuestros aceros especiales de la mejor
              calidad, principales proveedores de rodos industriales de la más
              alta resistencia y pioneros en la distribución de aceites
              hidráulicos.
            </p>
            <p className="mt-4">
              Cada producto tiene la garantía de nuestra experiencia.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
