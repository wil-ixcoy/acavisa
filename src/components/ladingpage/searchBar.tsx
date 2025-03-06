import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-2xl flex items-center border-2 border-gray-300 rounded-full px-4 py-2">
        <Input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-gray-700 outline-none bg-transparent px-2"
        />
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
