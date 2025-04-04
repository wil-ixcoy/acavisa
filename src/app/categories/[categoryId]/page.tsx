import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Category from "@/components/ladingpage/categoryCard";
import HelpComponent from "@/components/ladingpage/helpComponent";

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
      <div className="mt-4">
          <HelpComponent/>
          </div>
    
      <main className="mx-auto py-10 px-10">
        <Category />
      </main>

      <Footer />
    </div>
  );
}
