import { Home, List, ChevronDown } from "lucide-react";
import Link from "next/link";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const menuItems = [
    { label: "HISTORIA", path: "/history" },
    { label: "ÚNETE AL EQUIPO", path: "/join-the-team" },
    { label: "NOTICIAS Y EVENTOS", path: "/news-events" },
    { label: "BLOG", path: "/blog" },
    { label: "CONTÁCTANOS", path: "/contact" },
    { label: "PREGUNTAS FRECUENTES", path: "/faq" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed bg-black inset-0 opacity-40 z-40"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-green-700 text-white p-3 flex items-center space-x-2">
          <Home size={20} />
          <span className="font-semibold">MENU</span>
        </div>
        <div className="bg-green-600 text-white p-3 flex items-center space-x-2">
          <List size={20} />
          <span className="font-semibold">CATEGORIES</span>
        </div>

        <nav className="mt-2 space-y-2">
          {menuItems.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className="w-full flex items-center justify-start text-green-700 font-semibold p-3 border-t border-gray-200 hover:bg-gray-100 transition"
              onClick={onClose}
            >
              <ChevronDown size={18} className="mr-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
