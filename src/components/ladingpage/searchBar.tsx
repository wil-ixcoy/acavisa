import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-2xl flex items-center border-2 border-gray-100 rounded-full px-4 py-2 bg-white">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-gray-900 outline-none bg-transparent px-2 border-none focus:ring-0"
        />
        <Button variant="ghost" size="icon">
          <Search className="w-7 h-7 text-black hover:text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
