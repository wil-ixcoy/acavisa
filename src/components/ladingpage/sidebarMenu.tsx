import Image from "next/image";
import Link from "next/link";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const menuItems = [
    { label: "HISTORIA", path: "/history" },
    { label: "ÚNETE AL EQUIPO", path: "/join-us" },
    { label: "NOTICIAS Y EVENTOS", path: "/news-and-events" },
    { label: "BLOG", path: "/blog" },
    { label: "CONTÁCTANOS", path: "/contact-us" },
    { label: "PREGUNTAS FRECUENTES", path: "/faq" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed bg-black inset-0 opacity-40 z-40"
          onClick={onClose}></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="bg-secondary text-white p-3 flex items-center space-x-2">
          <Image
            src="/icons/home.png"
            alt="home"
            width={25}
            height={60}
            className="object-contain mr-4"
          />
          <span className="font-semibold">MENU</span>
        </div>
        <div className="bg-secondary text-white p-3 flex items-center space-x-2">
          <Image
            src="/icons/categories.png"
            alt="categories"
            width={25}
            height={60}
            className="object-contain mr-4"
          />
          <span className="font-semibold">CATEGORÍAS</span>
        </div>

        <nav className="mt-2 space-y-2">
          {menuItems.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className="w-full flex items-center justify-start text-primary font-bold p-3 border-t border-gray-200 hover:bg-gray-100 transition"
              onClick={onClose}>
              <Image
                src="/icons/arrow-sidebar.png"
                alt="pin"
                width={20}
                height={60}
                className="object-contain mr-4"
              />{" "}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
