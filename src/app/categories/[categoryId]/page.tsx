import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Category from "@/components/ladingpage/categoryCard";

export default function CategoryPage() {
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}
    >
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="mx-auto py-10 px-10">
        <Category />
      </main>

      <Footer />
    </div>
  );
}
