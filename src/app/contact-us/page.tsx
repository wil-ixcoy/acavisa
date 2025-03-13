import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Title from "@/components/ladingpage/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="max-w-6xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mt-6 items-start">
          <section className="p-6 text-verdeLimon">
            <h2 className="font-bold text-lg md:text-2xl mb-4">Contáctanos ahora</h2>
            <p className="mb-4 text-sm md:text-lg">
              Contamos con 75 años de experiencia, siendo líderes en el mercado
              de la industria. Somos reconocidos por nuestros productos de
              calidad, servicio eficiente y mejora continua.
            </p>
            <p className="font-bold mb-4 text-sm md:text-lg">¡Somos tu socio de negocios!</p>
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">Vísitanos</h3>
                <p className="text-xs md:text-lg">25 W. Su N 783, San Salvador</p>
              </section>
            </div>
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                />
              </svg>
              <section className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold">Correo electronico</h3>
                <p className="text-xs md:text-lg">acavisa.info@acavisa.com</p>
              </section>
            </div>
          </section>

          <section className="px-3">
            <Title align="left" size="sm">
              <p>Escríbenos</p>
            </Title>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-deepGray">
                Tu nombre
              </label>
              <Input type="text" name="name" id="name" className="w-full" />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-deepGray">
                Tu E-Mail
              </label>
              <Input type="email" name="email" id="email" className="w-full" />
            </div>
            <div className="mt-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-deepGray">
                Mensaje
              </label>
              <Textarea name="message" id="message" rows={4} className="w-full" />
            </div>
            <Button className="bg-primary rounded-none w-full sm:w-1/3 mt-4 hover:bg-secondary">
              Enviar
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
