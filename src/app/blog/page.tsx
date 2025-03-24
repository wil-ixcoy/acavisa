import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import BlogCard from "@/components/ladingpage/blogCard";

// Página de blog - 
export default function Blog() {
  const blog = [
    {
      title: "Aceros Especiales",
      description: "Aceros de calidad mundial para la fabricación de piezas de herramientas, maquinaria y moldes.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuofM315EjCsph8Bl8A9TBzRTbYaUuACt_w&s",
      link: "/aceros",
    },
    {
      title: "Sistemas de Almacenamiento",
      description: "Soluciones de almacenamiento rentables, de calidad, versátiles, seguros y óptimos para maximizar los espacios.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuofM315EjCsph8Bl8A9TBzRTbYaUuACt_w&s",
      link: "/almacenamiento",
    },
    {
      title: "Ruedas y Rodos",
      description: "Catálogo amplio de ruedas y rodos para la elaboración de productos industriales, resistentes y seguros.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuofM315EjCsph8Bl8A9TBzRTbYaUuACt_w&s",
      link: "/ruedas",
    },
  ]; 

  return (
    <div   className="w-full h-full bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="flex flex-wrap justify-center p-4 gap-6">
        {blog.map((product, index) => (
          <BlogCard key={index} {...product} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
