import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center py-3 px-2">
      <div className="w-full max-w-2xl flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm transition-all focus-within:border-gray-500">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-black-proces outline-none bg-transparent px-2 border-none focus:ring-0 placeholder-gray-500"
        />
        <Button variant="ghost" size="icon" className="p-1 sm:p-2">
          <Image
            src="/icons/search.png"
            alt="call"
            width={20}
            height={60}
            className="object-contain w-6 h-6 sm:w-7 sm:h-7 text-deep-gray hover:text-black transition-colors"
          />
        </Button>
      </div>
    </div>
  );
}
