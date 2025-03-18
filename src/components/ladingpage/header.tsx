import Image from "next/image";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/ladingpage/searchBar";
import Link from "next/link";

export default function Header() {
  return (
    <Card
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/backgrounds/background-header.png')" }}>
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-6 mt-3">
        <section className="flex items-center lg:mr-20">
          <Link href="/home">
            <Image
              src="/logos/horizontal-acavisa-full-color.png"
              alt="ACAVISA"
              width={250}
              height={120}
              className="object-contain"
            />
          </Link>
        </section>

        <section className=" lg:ml-20 flex flex-col items-center lg:items-end mt-3 lg:mt-0 lg:mr-8 text-sm text-deep-gray">
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-1 text-primary">
              <Image
                src="/icons/el-salvador.png"
                alt="sv"
                width={22}
                height={20}
                className="object-contain"
              />
              <span className="font-bold">EL SALVADOR</span>
            </div>

            <span className="hidden lg:block text-primary">|</span>

            <div className="flex items-center space-x-1 text-primary">
              <Image
                src="/icons/llamada-telefonica-full-collor.png"
                alt="call"
                width={22}
                height={60}
                className="object-contain mr-4"
              />
              <span className="font-bold">
                <strong>Call Center:</strong> 2231-4200
              </span>
            </div>

            <span className="hidden lg:block text-primary">|</span>

            <div className="flex items-center space-x-1 text-primary">
            <Image
                src="/icons/whatsapp.png"
                alt="whatsApp"
                width={22}
                height={60}
                className="object-contain mr-4"
              />
              <span className="font-bold">
                <strong>WhatsApp:</strong> 6025-1411
              </span>
            </div>
          </div>

          <div className="w-full mt-2 lg:mt-3">
            <SearchBar />
          </div>
        </section>
      </div>
    </Card>
  );
}
