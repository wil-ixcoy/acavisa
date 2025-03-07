import Ads from "@/components/ladingpage/ads";
import CategoryCard from "@/components/ladingpage/categoryCard";
import Header from "@/components/ladingpage/header";
import HelpComponent from "@/components/ladingpage/helpComponent";
import NavBar from "@/components/ladingpage/navBar";
export default function Home() {
  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>
      <Ads/>
      <HelpComponent/>
      <CategoryCard/>
    </div>
  );
}
