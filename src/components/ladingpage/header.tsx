import Image from "next/image";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/ladingpage/searchBar";
import Link from "next/link";

export default function Header() {
  return (
    <Card className="w-full" style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}>
      <div className="flex items-center justify-around px-6 mt-3">
        <section className="flex items-center">
         <Link href="/home">
         <Image
            src="/logo-acavisa1.png"
            alt="ACAVISA"
            width={250}
            height={120}
            className="object-contain"
          /></Link>
        </section>

      
        <section className="flex flex-col mr-8">
        <div className="flex items-center text-sm text-gray-700 space-x-4">
          <div className="flex items-center space-x-1 text-green-700">
            <Image
              src="/countries/sv.png"
              alt="sv"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>EL SALVADOR</span>
          </div>
          <span className="text-green-700">|</span>
          <div className="flex items-center space-x-1 text-green-700">
            <span>📞</span>
            <span>
              <strong>Call Center:</strong> 2231-4200
            </span>
          </div>
          <span className="text-green-700">|</span>
          <div className="flex items-center space-x-1 text-green-700">
            <span>💬</span>
            <span>
              <strong>WhatsApp:</strong> 6025-1411
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <SearchBar />
        </div>
        </section>
      </div>
    </Card>
  );
}