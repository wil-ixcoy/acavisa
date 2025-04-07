import Category from "@/components/ladingpage/categoryCard";
import HelpComponent from "@/components/ladingpage/helpComponent";

export default function CategoryPage() {
  return (
    <div>
      <div className="mt-4">
        <HelpComponent />
      </div>

      <main className="mx-auto py-10 px-10">
        <Category />
      </main>
    </div>
  );
}
