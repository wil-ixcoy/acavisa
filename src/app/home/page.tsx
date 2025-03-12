import Image from "next/image";
import Ads from "@/components/ladingpage/ads";
import CategoryCard from "@/components/ladingpage/categoryCard";
import Header from "@/components/ladingpage/header";
import HelpComponent from "@/components/ladingpage/helpComponent";
import NavBar from "@/components/ladingpage/navBar";
import PromotionsSection from "@/components/ladingpage/promotions";
import VideoComponent from "@/components/ladingpage/videoComponent";
import Footer from "@/components/ladingpage/footer";
import News from "@/components/ladingpage/news";

export default function Home() {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>
      <Ads />
      <HelpComponent />
      <CategoryCard />
      <PromotionsSection />
      <VideoComponent />

      <section className=" p-4 mb-6 mt-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-secondary text-white px-4 py-2">
            NUESTRAS MARCAS
          </div>
        </div>
        <div className="w-full h-auto bg-gray-200 p-5">
          <Image
            src="/examples/brands.png"
            alt="Marcas"
            width={600}
            height={300}
            className="w-full h-[240px] object-cover"
          />
        </div>
      </section>
      <News/>
      <Footer />
    </div>
  );
}
