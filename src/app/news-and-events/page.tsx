import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";

import Footer from "@/components/ladingpage/footer";

export default function NewsAndEvents() {
  return (
    <div>
      <header
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
        <Header />
        <NavBar />
      </header>

      <Footer />
    </div>
  );
}
