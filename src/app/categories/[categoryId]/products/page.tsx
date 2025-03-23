import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Product from "@/components/ladingpage/productCard";

export default function ProductsPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const productsByCategory: Record<
    string,
    { id: string; title: string; image: string }[]
  > = {
    baterias: [
      {
        id: "1",
        title: "Batería de auto premium",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        title: "Batería de motocicleta",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    grasas: [
      {
        id: "3",
        title: "Aceite sintético 5W-30",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "4",
        title: "Aceite mineral 10W-40",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    herramientas: [
      {
        id: "5",
        title: "Kit de detallado automotriz",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "6",
        title: "Llave de impacto neumática",
        image:
          "https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  };

  const products = productsByCategory[categoryId] || [];

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="mx-auto pt-1 pb-13 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mt-10">
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product.id} id={product.id} title={product.title} image={product.image} />
            ))
          ) : (
            <p className="text-center col-span-3">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
