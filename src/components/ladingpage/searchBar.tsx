import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center py-3 px-2">
      <div className="w-full max-w-2xl flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm transition-all focus-within:border-gray-500">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-gray-900 outline-none bg-transparent px-2 border-none focus:ring-0 placeholder-gray-500"
        />
        <Button variant="ghost" size="icon" className="p-1 sm:p-2">
          <Search className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 hover:text-black transition-colors" />
        </Button>
      </div>
    </div>
  );
}
