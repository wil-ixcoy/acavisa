"use client";

import Header from "@/components/ladingpage/header";
import Footer from "@/components/ladingpage/footer";
import { ContactInfoProvider } from "../../lib/ContactInforContext";
import NavBar from "@/components/ladingpage/navBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactInfoProvider>
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
        <Header />
        <NavBar/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ContactInfoProvider>
  );
}
